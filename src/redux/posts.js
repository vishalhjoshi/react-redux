import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{ id: "", title: "", body: "", userId: "" }],
  loading: false,
  error: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchPostsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload,
      };
    },
    postPostSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: "",
        data: [action.payload, ...state.data],
      };
    },
  },
});

// Destructure and export the plain action creators
export const { pending, errored, fetchPostsSuccess, postPostSuccess } =
  postSlice.actions;

export default postSlice.reducer;

// create a thunk that dispatches action creators
export const fetchPosts = () => async (dispatch, getState) => {
  dispatch(pending());
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.splice(0, 10));
      dispatch(fetchPostsSuccess(data.splice(0, 10)));
    })
    .catch((error) => {
      dispatch(errored(error.message));
    });
};

export const addTodo = (payload) => async (dispatch, getState) => {
  dispatch(pending());
  fetch("https://60fbf98791156a0017b4c972.mockapi.io/api/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(postPostSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(errored(err.message));
    });
};
