import React, { useEffect, useState } from 'react';
import { Alert } from "antd";
import { axiosInstance, useAxios } from 'api';
import { useAppContext } from 'store';
import Post from 'components/Post';


function PostList() {
    const { store: { accessToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const apiUrl = '/api/posts/';
    const [postList, setPostList] = useState([])
    const [{ data: originPostList, loading, error }] = useAxios({
        url: apiUrl, headers
    });

    const handleLike = async ({ post, isLike }) => {
        const apiUrl = `/api/posts/${post.id}/like/`;
        const method = isLike ? 'POST': 'DELETE';

        try {
            await axiosInstance({
                url: apiUrl,
                method,
                headers,
            });

            setPostList(prevList => {
                return prevList.map(currentPost =>
                    currentPost === post ?
                    { ...currentPost, is_like: isLike } :
                    currentPost
                );
            });

        } catch(error) {
            console.log('error :', error);
        }    
    };

    useEffect(() => {
        setPostList(originPostList);
    }, [originPostList]);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>로딩중 에러가 발생했습니다.</div>}
            
            {postList && postList.length === 0 && (
                <Alert type="warning" message="포스팅이 없습니다. :-(" />
            )}

            {postList && postList.map(post =>
                <Post 
                    post={post} 
                    key={post.id} 
                    handleLike={handleLike}
                />
            )}
        </div>
    )
}

export default PostList;