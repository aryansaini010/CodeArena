import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const initialState: UIState = {
  theme: 'dark',
  sidebarOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    showToast(state, action) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { toggleTheme, toggleSidebar, showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
