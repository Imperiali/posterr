import { PostsContext } from "../PostsProvider";
import { useContext } from "react";

const usePost = (username = "") => {
  const { state, dispatch } = useContext(PostsContext);
  const { loading, posts } = state;
  let ownPosts = [];

  if (username) {
    ownPosts = posts?.filter((post) => post.user === username) || [];
  }

  return {
    loading,
    setLoading: (loading) => dispatch({ type: "SET_LOADING", loading }),
    allPosts: posts,
    ownPosts,
    addPost: (post) => dispatch({ type: "ADD_POST", post }),
    fetchPosts: (posts) => dispatch({ type: "FETCH_POSTS", posts }),
    likePost: ({ currentUsername, postId }) =>
      dispatch({ type: "LIKE_POST", currentUsername, postId }),
    dislikePost: ({ currentUsername, postId }) =>
      dispatch({
        type: "DISLIKE_POST",
        currentUsername,
        postId,
      }),
  };
};

export default usePost;
