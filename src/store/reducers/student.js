import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  students: [],
};
export const studentSlice = createSlice({
  name: "student",
  initialState: theInitialState,
  reducers: {
    update(state, action) {
      state.students = action.payload.students;
    },
  },
});

export default studentSlice;
