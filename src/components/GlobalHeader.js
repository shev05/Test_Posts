import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder, setFilterValue } from '../features/posts/postsSlice';
import "../components-style/GlobalHeader.css";
import CreatePostModal from "./CreatePostModal";

const GlobalHeader = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.data);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div className="container">
            <div className="text-block">
                <p>Posts</p>
            </div>
            <div className="controls-block">
                <select 
                onChange={(e) => dispatch(setSortOrder(e.target.value))}
                className="dropdown"
                >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                </select>
                
                <select 
                onChange={(e) => dispatch(setFilterValue(e.target.value))}
                className="dropdown"
                >
                <option value="all">All Authors</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                    {user.name}
                    </option>
                ))}
                </select>
                <button className="create-button"
                onClick={() => setIsModalOpen(true)}
                >Create Post</button>
            </div>
            {isModalOpen && (
        <CreatePostModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
        </div>
    );
};
export default GlobalHeader;