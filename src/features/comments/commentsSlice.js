import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getComments, createComment } from '../../api/CommentService';

export const fetchComments = createAsyncThunk(
  'post/fetchComments',
  async (id, { rejectWithValue }) => {
    try {
      return await getComments(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNewComment = createAsyncThunk(
  "posts/createNewComment",
  async ({id , postData}, { rejectWithValue }) => {
    try {
      const response = await createComment(id, postData); 
      if (!response.ok) {
        throw new Error("Ошибка при создании комментария");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      data: [],
      status: 'idle',
      error: null,
    },
    reducers: {
        clearComments: (state) => {
            state.data = [];
            state.status = 'idle';
            state.error = null;
          }
      },
      extraReducers: (builder) => {
          builder
            .addCase(fetchComments.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.data = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.payload;
            })
            .addCase(createNewComment.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(createNewComment.fulfilled, (state, action) => {
              state.status = 'succeeded';
            })
            .addCase(createNewComment.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.payload;
            })
            ;
        },
    });

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;