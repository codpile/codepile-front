import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  subjects: [],
};
export const predictionSlice = createSlice({
  name: "subject",
  initialState: theInitialState,
  reducers: {
    updateSubjects(state, action) {
      state.subjects = action.payload.subjects;
      return;
    },
    addOne(state, action) {
      state.subjects = state.subjects.push(action.payload.subject);
      return;
    },
    clearSubjects(state) {
      state.subjects = [];
    },
  },
});

export default predictionSlice;
