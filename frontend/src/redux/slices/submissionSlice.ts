import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export interface Submission {
  _id: string;
  problemId: any;
  userId: any;
  language: string;
  code: string;
  verdict: string;
  runtime: number;
  memory: number;
  createdAt: string;
}

interface SubmissionState {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
}

const initialState: SubmissionState = {
  submissions: [],
  loading: false,
  error: null,
};

export const fetchSubmissions = createAsyncThunk(
  'submissions/fetchByProblem',
  async (problemId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/submissions/history?problemId=${problemId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch submissions');
    }
  }
);

const submissionSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => { state.loading = true; })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default submissionSlice.reducer;
