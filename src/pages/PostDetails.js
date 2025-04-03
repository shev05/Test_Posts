import React from 'react';
import PostHeader from '../components/PostHeader';
import PostBody from '../components/PostBody';
import GlobalFooter from '../components/GlobalFooter'
import PostComment from '../components/PostComment';
import PostAddComment from '../components/PostAddComment';
import "../components-style/GlobalPage.css";

const PostDetail = () => {
    return (
      <div className="page-container">
        <PostHeader />
        <PostBody />
        <PostComment />
        <PostAddComment />
        <GlobalFooter/>
      </div>
    )
};

export default PostDetail;