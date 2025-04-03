import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "../components-style/PostComment.css"
import { clearComments, fetchComments } from "../features/comments/commentsSlice";

const PostComment = () =>{
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: comments, status, error} = useSelector((state) => state.comments);

    useEffect(() => {
            dispatch(fetchComments(id));
            return () => {
                dispatch(clearComments());
            };
        }, [dispatch, id]);
    
    if (status === 'loading') return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
        
    return (
    <div>
        <h1 className="comment-head">
            Comments
        </h1> 
        <div className="comment-flex">
        {comments.map(comments => (
                    <div key={comments.id} className="comment-card">
                        <h3 className="comment-name">{comments.name}</h3>
                        <p className="comment-email">{comments.email}</p>
                        <p className="comment-content">{comments.body}</p>
                    </div>
                ))}
        </div>
    </div> 
    );
};

export default PostComment;