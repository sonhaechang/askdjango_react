import React, { useState } from 'react';
import { Avatar, Tooltip, Input, Button } from 'antd';
import moment from 'moment';
import { axiosInstance, useAxios } from 'api';
import Comment from './Comment';
import { useAppContext } from 'store';

function CommentList({ post }) {
    const { store: { accessToken } } = useAppContext();

    const headers = { Authorization: `Bearer ${accessToken}` };
    const apiUrl = `/api/posts/${post.id}/comments/`;

    const [{ data: commentList, loading, error }, refetch] = useAxios({
        url: apiUrl, 
        headers
    });

    const [commentContent, SetCommentContent] = useState('');

    const handleCommentSave = async () => {
        try {
            const response = await axiosInstance.post(
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
            {loading && <div>Loading...</div>}
            {error && <div>로딩중 에러가 발생했습니다.</div>}
            
            {commentList && commentList.map(comment => 
                <Comment 
                    key={comment.id}
                    author={comment.author.name ? comment.author.name : comment.author.username}
                    avatar={
                        <Avatar 
                            // FIXME: avatar_url에 host 지정
                            src={comment.author.avatar_url} 
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