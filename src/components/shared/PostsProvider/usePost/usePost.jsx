import {PostsContext} from "../PostsProvider";
import {useContext} from "react";

const usePost = (username = '') => {
    const {state, dispatch} = useContext(PostsContext)
    const {loading, posts} = state
    let ownPosts = []

    if (username) {
        ownPosts = posts?.filter((post) => post.user === username) || []
    }

    return {
        loading,
        setLoading: (loading) => dispatch({type: 'SET_LOADING', loading}),
        allPosts: posts,
        ownPosts,
        addPost: (post) => dispatch({type: 'ADD_POST', post}),
        fetchPosts: (posts) => dispatch({type: 'FETCH_POSTS', posts}),
        likePost: ({currentUsername, postUsername}) => dispatch({type: 'LIKE_POST', currentUsername, postUsername}),
        dislikePost: ({currentUsername, postUsername}) => dispatch({
            type: 'DISLIKE_POST',
            currentUsername,
            postUsername
        })
    }
}

export default usePost