import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  predictionResults: {},
};
export const predictionSlice = createSlice({
  name: "prediction",
  initialState: theInitialState,
  reducers: {
    updatePrediction(state, action) {
      state.predictionResults = action.payload.predictionResults;
      return;
    },
    clearPrediction(state) {
      state.predictionResults = action.payload.predictionResults;
    },
  },
});

export default predictionSlice;
