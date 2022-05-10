import {useContext} from "react";
import {UserContext} from "../UserProvider";
import {formatDatetime} from "../../../utils/formatDatetime";

const useUser = () => {
    const {state: user, dispatch} = useContext(UserContext)

    const {name, avatarUrl, followers, following, posts, createdAt} = user

    return {
        name,
        avatarUrl,
        followers,
        following,
        posts,
        createdAt: formatDatetime(createdAt),
        fetchCurrentUser: () => dispatch({type: 'FETCH_CURRENT_USER'}),
        follow: (username) => dispatch({type: 'FOLLOW_USER', username}),
        unfollow: (username) => dispatch({type: 'UNFOLLOW_USER', username}),
    }
}

export default useUser