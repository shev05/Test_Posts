import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../features/posts/postsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components-style/CreatePostModal.css";

const CreatePostModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createNewPost({ title, body: content })).unwrap();
      toast.success("Пост успешно создан!");
      onClose();
    } catch (error) {
      toast.error(`Ошибка: ${error}`);
    }
  };

  return (
    <div className="modal-overlay-window">
      <div className="modal-window">
        <button className="close-button-window" onClick={onClose} disabled={loading}>
          &times;
        </button>

        <h2>Create New Post</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group-window">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group-window">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
              disabled={loading}
            />
          </div>

          <div className="modal-actions-window">
            <button type="button" onClick={onClose} className="cancel-button-window" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="create-button-window" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
