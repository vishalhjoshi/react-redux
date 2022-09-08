import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "../redux/posts";

export const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const handleClick = () => {
    dispatch(addTodo({ name: inputRef.current.value, completed: false }));
  };
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="section">
      <div>
        <h3 className="heading"> Blog Posts</h3>
      </div>
      {posts.loading && <div>Loading...</div>}
      <div className="posts">
        {posts.data.map((post, index) => (
          <div className="text post" key={index}>
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};
