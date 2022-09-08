import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./redux/posts";
import errorReducer from "./redux/errors";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    errors: errorReducer,
  },
});
