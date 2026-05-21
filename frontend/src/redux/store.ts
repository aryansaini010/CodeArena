import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import problemReducer from './slices/problemSlice';
import contestReducer from './slices/contestSlice';
import discussionReducer from './slices/discussionSlice';
import submissionReducer from './slices/submissionSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemReducer,
    contests: contestReducer,
    discussions: discussionReducer,
    submissions: submissionReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
