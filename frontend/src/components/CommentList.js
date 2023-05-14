import React, { useState } from 'react';
import { Avatar, Tooltip, Input, Button } from 'antd';
import moment from 'moment';
import useAxios from 'axios-hooks';
import Axios from 'axios';
import Comment from './Comment';
import { useAppContext } from 'store';
import axios from 'axios';

function CommentList({ post }) {
    const { store: { accessToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${accessToken}` };
    const apiUrl = `http://127.0.0.1:8000/api/posts/${post.id}/comments/`;

    const [{ data: commentList, loading, error }, refetch] = useAxios({
        url: apiUrl, 
        headers
    });

    const [commentContent, SetCommentContent] = useState('');

    const handleCommentSave = async () => {
        try {
            const response = await Axios.post(
                apiUrl, 
                { message: commentContent },
                { headers }
            );
            console.log(response);
            SetCommentContent('');
            refetch();
           
        } catch(error) {
            console.log(error.response);
        }
        
    };

    return (
        <div>
            {commentList && commentList.map(comment => 
                <Comment 
                    key={comment.id}
                    author={comment.author.name ? comment.author.name : comment.author.username}
                    avatar={
                        <Avatar 
                            // FIXME: avatar_url에 host 지정
                            src={'http://127.0.0.1:8000' + comment.author.avatar_url} 
                            alt={comment.author.name ? comment.author.name : comment.author.username} 
                        />
                    }
                    content={
                        <p>{comment.message}</p>
                    }
                    datetime={
                        <Tooltip title={moment().format(comment.created_at)}>
                            <span>{moment(comment.created_at).fromNow()}</span>
                        </Tooltip>
                    }
                />
            )}

            <Input.TextArea 
                style={{ marginBottom: '.5em' }} 
                value={commentContent}
                onChange={e => SetCommentContent(e.target.value)}
            />

            <Button 
                block 
                type='primary'
                disabled={commentContent.length === 0}
                onClick={handleCommentSave}
            >
                댓글 쓰기
            </Button>
        </div>
    );
}

export default CommentList;