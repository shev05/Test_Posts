import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts,  createPost, deletePost } from '../../api/PostService';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ sortOrder = 'asc', filterValue = 'all' }, { rejectWithValue }) => {
    try {
      const params = {};
      if (filterValue !== 'all') params.userId = filterValue;
      if (sortOrder) {
        params._sort = 'id'; 
        params._order = sortOrder;
      }
      return await getPosts(params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPost(postData); 
      if (!response.ok) {
        throw new Error("Ошибка при создании поста");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) =>{
    try{
      const response = await deletePost(id)
      if (!response.ok) {
        throw new Error("Ошибка при удалении поста");
      }
      return true;
    }
    catch(error) {
      return rejectWithValue(error.message);
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    sortOrder: 'asc',
    filterValue: 'all',
  },
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSortOrder, setFilterValue } = postsSlice.actions;
export default postsSlice.reducer;