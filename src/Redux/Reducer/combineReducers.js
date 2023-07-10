import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../Slices/authSlice";
import profileSlice from "../Slices/profileSlice";
import cartSlice from "../Slices/cartSlice";
import courseSlice from "../Slices/CourseSlice";
import viewCourseSlice from "../Slices/ViewCourseSlice";

const rootReducer = combineReducers({
    auth : authSlice,
    profile : profileSlice,
    cart : cartSlice,
    course : courseSlice,
    viewCourse : viewCourseSlice
})

export default rootReducer;