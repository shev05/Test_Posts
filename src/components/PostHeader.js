import React from "react";
import { useNavigate} from 'react-router-dom';
import "../components-style/PostHeader.css";


const PostHeader = () =>{
    const navigate = useNavigate();
    return(
        <div className="container">
            <button className="back-button" 
            onClick={() => navigate(-1)}
            >Back to posts</button>
        </div>
    )
}

export default PostHeader;