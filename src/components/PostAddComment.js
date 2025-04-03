import React, {useState} from "react";
import '../components-style/PostAddComment.css'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createNewComment } from "../features/comments/commentsSlice";

const PostAddComment = () =>{
    const dispatch = useDispatch();
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[comment, setComment] = useState('')
    const { id } = useParams();


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await dispatch(createNewComment( id, {name, email, comment} )).unwrap();
          toast.success("Комментарий успешно создан!");
        } catch (error) {
          toast.error(`Ошибка: ${error}`);
        }
      };

    return (
      <form className="comment-form" onSubmit={handleSubmit}>
           <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}            
              type="name" 
              id="name" 
              placeholder="placeholder..." 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}            
              type="email" 
              id="email" 
              placeholder="placeholder..." 
              required
            />
          </div>
    
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment" 
              placeholder="placeholder..." 
              rows="4"
              required
            />
          </div>
        
          <div className="form-actions">
              <button type="submit" className="submit-button">Send</button>
          </div>
      </form>
      );
}

export default PostAddComment