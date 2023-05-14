import React from 'react';
import './Comment.scss';

function Comment({ author, avatar, content, datetime }) {
    return (
        <div className='comment'>
            <div className='comment-inner'>
                <div className='comment-avatar'>
                    { avatar && avatar }
                </div>

                <div className='comment-content'>
                    <div className='comment-content-author'>
                        <span className='comment-content-author-name'>
                            { author && author }
                        </span>
                        <span className='comment-content-author-time'>
                            { datetime && datetime }
                        </span>
                    </div>

                    <div className='comment-content-detail'>
                        { content && content }
                    </div>
                </div>
            </div>
        </div>
    );
}

Comment.defaultProps = {
    author: null, 
    avatar: null, 
    content: null, 
    datetime: null
}

export default Comment;