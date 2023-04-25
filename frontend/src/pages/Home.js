import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import PostList from "components/PostList";
import AppLayout from 'components/AppLayout';
import StoryList from 'components/StoryList';
import SuggestionList from 'components/SuggestionList';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/posts/new');
    };

    const sidebar = (
        <>
            <Button 
                block
                type='primary'
                style={{ marginBottom: '1rem' }}
                onClick={handleClick}>
                새 포스팅 쓰기
            </Button>
            <StoryList style={{ marginBottom: '1rem' }} />
            <SuggestionList />
        </>
    );

    return (
        <AppLayout sidebar={sidebar}>
            <PostList />
        </AppLayout>
    );
};

export default Home;