import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "gallery/fetchImages",
  async (pageNo: number = 1) => {
    const result = await axios.get(
      `https://picsum.photos/v2/list?limit=15&page=${pageNo}`
    );
    return result.data;
  }
);

interface iniState {
  loading: boolean;
  items: [];
  error: string | undefined;
  pageNo: number;
  // reference: React.MutableRefObject<HTMLDivElement | null> | null;
  ref: boolean;
}

const initialState: iniState = {
  loading: true,
  items: [],
  error: "err",
  pageNo: 1,
  // reference: null,
  ref: false,
};

const homeItemSlice = createSlice({
  name: "homeItem",

  initialState,
  reducers: {
    pageNext: (state) => {
      state.pageNo++;
    },

    pagePrev: (state) => {
      state.pageNo--;
    },

    refTest: (state) => {
      state.ref = !state.ref;
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
export const { pagePrev, pageNext, refTest } = homeItemSlice.actions;
