import React, { useMemo, useReducer } from "react";

const POSTS_KEY = "posterrPosts";
export const PostsContext = React.createContext();
const PostsInitialState = {
  loading: true,
  posts: [],
};
export const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "FETCH_POSTS": {
      let posts = localStorage.getItem(POSTS_KEY);

      if (!posts) {
        localStorage.setItem(POSTS_KEY, JSON.stringify(action.posts));

        return {
          ...state,
          posts: action.posts,
        };
      }

      return {
        ...state,
        ...JSON.parse(posts),
      };
    }
    case "ADD_POST": {
      let updatedPosts = state.posts;
      updatedPosts = [action.post, ...updatedPosts];

      const updatedState = {
        ...state,
        posts: updatedPosts,
      };

      localStorage.setItem(POSTS_KEY, JSON.stringify(updatedState));

      return updatedState;
    }
    case "LIKE_POST": {
      state.posts.map((post) => {
        if (
          post.user === action.postUsername &&
          post.likes.indexOf(action.currentUsername) === -1
        ) {
          post.likes.push(action.currentUsername);
        }
      });

      const updatedState = {
        ...state,
      };

      localStorage.setItem(POSTS_KEY, JSON.stringify(updatedState));

      return updatedState;
    }
    case "DISLIKE_POST": {
      state.posts.map((post) => {
        if (
          post.user === action.postUsername &&
          post.likes.indexOf(action.currentUsername) !== -1
        ) {
          post.likes.splice(post.likes.indexOf(action.currentUsername), 1);
        }
      });

      const updatedState = {
        ...state,
      };

      localStorage.setItem(POSTS_KEY, JSON.stringify(updatedState));

      return updatedState;
    }
  }
};

const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, PostsInitialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
