import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import commentsReducer from '../features/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    post: postReducer,
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});