import React from 'react';
import { Avatar, Card } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";

function Post({ post }) {
    const { author, caption, location, photo, tag_set, like_user_set } = post;
    const { username, name, avatar_url } = author;

    return (
        <div className="post">
            <Card
                hoverable
                cover={                     
                    <img src={photo} alt={caption} /> 
                }
                actions={[<HeartFilled />]}
            >
                <Card.Meta
                    avatar={ 
                        <Avatar 
                            size="large" 
                            icon={
                                <img 
                                    src={`http://127.0.0.1:8000` + avatar_url} 
                                    alt={username} 
                                />
                            } 
                        /> 
                    }
                    title={location}
                    description={caption}
                />
            </Card>
        </div>
    );
};

export default Post;