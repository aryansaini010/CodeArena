import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: { inputText: string; outputText: string; explanation?: string }[];
  constraints: string[];
  starterCode: { language: string; code: string }[];
  editorial?: string;
  tags: string[];
  companies: string[];
}

interface ProblemState {
  problems: Problem[];
  currentProblem: Problem | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProblemState = {
  problems: [],
  currentProblem: null,
  loading: false,
  error: null,
};

export const fetchProblems = createAsyncThunk('problems/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/problems');
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch problems');
  }
});

export const fetchProblemBySlug = createAsyncThunk(
  'problems/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/problems/${slug}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch problem');
    }
  }
);

const problemSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    clearCurrentProblem(state) {
      state.currentProblem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => { state.loading = true; })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProblemBySlug.pending, (state) => { state.loading = true; })
      .addCase(fetchProblemBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProblem = action.payload;
      })
      .addCase(fetchProblemBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProblem } = problemSlice.actions;
export default problemSlice.reducer;
