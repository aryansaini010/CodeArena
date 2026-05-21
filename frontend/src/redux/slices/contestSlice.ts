import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export interface Contest {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  problems: any[];
  participants: any[];
  createdBy: any;
}

interface ContestState {
  contests: Contest[];
  currentContest: Contest | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContestState = {
  contests: [],
  currentContest: null,
  loading: false,
  error: null,
};

export const fetchContests = createAsyncThunk('contests/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/contests');
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch contests');
  }
});

export const fetchContestById = createAsyncThunk(
  'contests/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/contests/${id}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch contest');
    }
  }
);

export const joinContest = createAsyncThunk(
  'contests/join',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/contests/${id}/join`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to join contest');
    }
  }
);

const contestSlice = createSlice({
  name: 'contests',
  initialState,
  reducers: {
    clearCurrentContest(state) {
      state.currentContest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContests.pending, (state) => { state.loading = true; })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload;
      })
      .addCase(fetchContests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchContestById.pending, (state) => { state.loading = true; })
      .addCase(fetchContestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContest = action.payload;
      })
      .addCase(fetchContestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(joinContest.fulfilled, (state, action) => {
        state.currentContest = action.payload;
      });
  },
});

export const { clearCurrentContest } = contestSlice.actions;
export default contestSlice.reducer;
