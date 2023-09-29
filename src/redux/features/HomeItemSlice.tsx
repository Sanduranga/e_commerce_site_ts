import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "gallery/fetchImages",
  async (pageNo: number = 1) => {
    const result = await axios.get(
      `https://picsum.photos/v2/list?limit=12&page=${pageNo}`
    );
    return result.data;
  }
);

const homeItemSlice = createSlice({
  name: "homeItem",

  initialState: {
    loading: true,
    items: [],
    error: undefined as string | undefined,
    pageNo: 1,
  },
  reducers: {
    pageNext: (state) => {
      state.pageNo++;
    },

    pagePrev: (state) => {
      state.pageNo--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const homeItemsReducer = homeItemSlice.reducer;
export const { pagePrev, pageNext } = homeItemSlice.actions;
