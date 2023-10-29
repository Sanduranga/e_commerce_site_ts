import { createSlice } from "@reduxjs/toolkit";

interface iniState {
  dark: boolean;
  menuslide: boolean;
}

const initialState: iniState = {
  dark: false,
  menuslide: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.dark = !state.dark;
    },
    showMenuBar: (state) => {
      state.menuslide = !state.menuslide;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { toggleMode, showMenuBar } = themeSlice.actions;
