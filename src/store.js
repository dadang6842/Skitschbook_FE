import { configureStore, createSlice } from "@reduxjs/toolkit";

const finalCroppedImageSlice = createSlice({
  name: "finalCroppedImage",
  initialState: null,
  reducers: {
    setFinalCroppedImage: (state, action) => action.payload,
  },
});

export const { setFinalCroppedImage } = finalCroppedImageSlice.actions;

export default configureStore({
  reducer: {
    finalCroppedImage: finalCroppedImageSlice.reducer,
  },
});
