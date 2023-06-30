import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  students: [],
  student: {},
};
export const studentSlice = createSlice({
  name: "student",
  initialState: theInitialState,
  reducers: {
    update(state, action) {
      state.students = action.payload.students;
    },
    addStudent(state, action) {
      state.students = state.students.push(action.payload.student);
    },
    updateStudent(state, action) {
      state.student = action.payload.student;
    },
  },
});

export default studentSlice;
