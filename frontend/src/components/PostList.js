import React, { useEffect, useState } from 'react';
import { Alert } from "antd";
import Axios from 'axios';
import Post from 'components/Post';
import { useAppContext } from 'store';

function PostList() {
    const apiUrl = 'http://127.0.0.1:8000/api/posts/';
    const [postList, setPostList] = useState([]); 
    const {
        store: { accessToken },
        dispatch
    } = useAppContext();

    useEffect(() => {
        const headers = { Authorization: `Bearer ${accessToken}` }

        Axios.get(apiUrl, { headers })
            .then(response => {
                const { data } = response;
                setPostList(data);
            })
            .catch(error => {
                // error.response;
            })
	}, []);

    return (
        <div>
            {postList.length === 0 && (
                <Alert type="warning" message="포스팅이 없습니다. :-(" />
            )}

            {postList.map(post =>
                <Post post={post} key={post.id} />
            )}
        </div>
    )
}

export default PostList;