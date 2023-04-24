import React from 'react';
import { Alert } from "antd";
import useAxios from 'axios-hooks';
import { useAppContext } from 'store';
import Post from 'components/Post';

function PostList() {
    const { store: { accessToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${accessToken}` }
    const apiUrl = 'http://127.0.0.1:8000/api/posts/';
    const [{ data: postList, loading, error }] = useAxios({
        url: apiUrl, headers
    });

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>로딩중 에러가 발생했습니다.</div>}
            
            {postList && postList.length === 0 && (
                <Alert type="warning" message="포스팅이 없습니다. :-(" />
            )}

            {postList && postList.map(post =>
                <Post post={post} key={post.id} />
            )}
        </div>
    )
}

export default PostList;