import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost, deletePost, updatePost } from '../../api/PostService';

export const fetchPost = createAsyncThunk(
  'post/fetchPost',
  async (id, { rejectWithValue }) => {
    try {
      return await getPost(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async ({id, updatedPost}, { rejectWithValue }) => {
    try {
      const response = await updatePost(id, updatedPost);
      if (!response.ok) {
        throw new Error('Failed to edit post');
      }

      return true
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removePost = createAsyncThunk(
  'post/removePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deletePost(id);
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearPost: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removePost.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = null;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }).addCase(editPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editPost.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;