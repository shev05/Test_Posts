import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts} from '../features/posts/postsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import "../components-style/GlobalBody.css";
import { useNavigate } from 'react-router-dom';
import { deletePosts } from "../features/posts/postsSlice";
import { toast } from "react-toastify";


const GlobalBody = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: posts, status, error, sortOrder, filterValue } = useSelector((state) => state.posts);
    const users = useSelector((state) => state.users.data);

    useEffect(() => {
        dispatch(fetchPosts({ sortOrder, filterValue }));
        dispatch(fetchUsers());
      }, [dispatch, sortOrder, filterValue]);

    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleDelete = async (id) => {
        try {
          await dispatch(deletePosts(id)).unwrap();
          toast.success('Пост успешно удалён!');
        } catch (error) {
          toast.error(`Error deleting post: ${error}`);
        }
      };

    return (
        <div className="posts-grid">
            {posts.map(post => {
                const user = users.find(u => u.id === post.userId);
                const authorName = user ? user.name : 'Unknown Author';
                return(
                <div key={post.id} className="post-card">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{post.body}</p>
                    <p className="post-author">Author: {authorName}</p>
                    <div className="post-actions">
                        <button 
                            className="action-button"
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            View Post
                        </button>
                        
                        <button 
                            className="delete-button"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete Post
                        </button>
                    </div>
                </div>
                );
            })}
        </div>
    );
};

export default GlobalBody;