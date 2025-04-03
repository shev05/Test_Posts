import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "../components-style/PostBody.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, clearPost } from "../features/posts/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePosts } from "../features/posts/postsSlice";
import { editPost } from "../features/posts/postSlice";


const PostBody = () =>{
    const [editingPost, setEditingPost] = useState(false)
    const [editedTitle, setEditedTitle] = useState("");
    const [editedBody, setEditedBody] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: post, status, error } = useSelector((state) => state.post);
    
    useEffect(() => {
        if (post) {
            setEditedTitle(post.title);
            setEditedBody(post.body);
        }
    }, [post]);

    useEffect(() => {
        dispatch(fetchPost(id));
        
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id]);

    const handleEdit = () =>{
        setEditingPost(true)
    }

    const handleSave = async() =>{
        try {
            await dispatch(editPost({id, updatedPost: {title: editedTitle, body: editedBody }})).unwrap();
            toast.success("Пост успешно изменен!");
          } catch (error) {
            toast.error(`Ошибка: ${error}`);
          }
          finally{
            setEditingPost(false)
          }
    }

    const handleCancel = () => {
        setEditingPost(false);
        setEditedTitle(post.title);
        setEditedBody(post.body);
    }

    const handleDelete = async (id) => {
        try {
          await dispatch(deletePosts(id)).unwrap();
          toast.success('Пост успешно удалён!');
          navigate(-1)

        } catch (error) {
          toast.error(`Error deleting post: ${error}`);
        }
      };

    if (status === 'loading') return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!post) return <div className="not-found">Post not found</div>;

    return (
        <div key={id} className="post-detail-card">
            {editingPost ? (
                <div className="edit-actions">
                    <input
                        type="text"
                        className="edit-title-input"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="edit-body-textarea"
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                        rows={5}
                    />
                </div>
            ) : (
                <>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{post.body}</p>
                </>
            )}
                    
            <div className="post-actions">
                {editingPost ? ( 
                    <div className="edit-actions-button">
                        <button 
                            className="action-detail-button"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="action-cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button 
                        className="action-detail-button"
                        onClick={handleEdit}
                    >
                        Edit Post
                    </button>
                )}
                     
                <button 
                    className="delete-button"
                    onClick={() => handleDelete(post.id)}
                    disabled={editingPost}
                >
                    Delete Post
                </button>
            </div>
        </div>
    );
};

export default PostBody