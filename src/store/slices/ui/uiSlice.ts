import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, Theme } from './types';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  notifications: Notification[];
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { setTheme, toggleSidebar, addNotification, removeNotification } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;