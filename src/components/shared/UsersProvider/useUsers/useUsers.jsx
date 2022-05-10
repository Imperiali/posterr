import {useContext} from "react";
import {UsersContext} from "../UsersProvider";
import {formatDatetime} from "../../../utils/formatDatetime";

const useUsers = (username) => {
    const { state: users, dispatch } = useContext(UsersContext)

    const { name, avatarUrl, followers, following, posts, createdAt } = users.find((user) => user.name === username) || {}

    return {
        name,
        avatarUrl,
        followers,
        following,
        posts,
        createdAt: formatDatetime(createdAt),
        fetchUsers: () => dispatch({type: 'FETCH_USERS'})
    }
}

export default useUsers