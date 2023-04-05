import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Post from 'components/Post';

function PostList() {
    const apiUrl = 'http://127.0.0.1:8000/api/posts';
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
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
            {postList.map(post =>
                <Post post={post} key={post.id} />
            )}
        </div>
    )
}

export default PostList;