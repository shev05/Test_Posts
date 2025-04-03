import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/UserService';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;