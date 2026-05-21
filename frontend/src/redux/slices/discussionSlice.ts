import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export interface Discussion {
  _id: string;
  title: string;
  content: string;
  author: any;
  problemId?: any;
  tags: string[];
  upvotes: string[];
  comments: any[];
  createdAt: string;
}

interface DiscussionState {
  discussions: Discussion[];
  currentDiscussion: Discussion | null;
  loading: boolean;
  error: string | null;
}

const initialState: DiscussionState = {
  discussions: [],
  currentDiscussion: null,
  loading: false,
  error: null,
};

export const fetchDiscussions = createAsyncThunk('discussions/fetchAll', async (problemId: string | undefined, { rejectWithValue }) => {
  try {
    const url = problemId ? `/discussions?problemId=${problemId}` : '/discussions';
    const { data } = await API.get(url);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch discussions');
  }
});

export const fetchDiscussionById = createAsyncThunk(
  'discussions/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/discussions/${id}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch discussion');
    }
  }
);

export const createDiscussion = createAsyncThunk(
  'discussions/create',
  async (discussionData: any, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/discussions', discussionData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create discussion');
    }
  }
);

const discussionSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    clearCurrentDiscussion(state) {
      state.currentDiscussion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussions.pending, (state) => { state.loading = true; })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions = action.payload;
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDiscussionById.pending, (state) => { state.loading = true; })
      .addCase(fetchDiscussionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDiscussion = action.payload;
      })
      .addCase(fetchDiscussionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentDiscussion } = discussionSlice.actions;
export default discussionSlice.reducer;
