import React, {useMemo, useReducer} from "react";

const CURRENT_USER_KEY = 'posterrCurrentUser'
export const UserContext = React.createContext()
const UserInitialState = {
    name: 'PeterParker',
    avatarUrl: 'https://picsum.photos/200',
    followers: ['HarryOsborn', 'MaryJane'],
    following: ['HarryOsborn', 'MaryJane', 'TonyStark', 'DrStrange'],
    createdAt: '03-01-2022'
}
export const userReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CURRENT_USER': {
            let currentUser = localStorage.getItem(CURRENT_USER_KEY)

            if (!currentUser) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(UserInitialState))
                return UserInitialState
            }

            return {
                ...JSON.parse(currentUser)
            }
        }
        case 'FOLLOW_USER': {
            const actualFollowing = state.following

            actualFollowing.push(action.username)

            const updatedState = {
                ...state,
                following: actualFollowing
            }

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedState))

            return updatedState
        }
        case 'UNFOLLOW_USER': {
            const actualFollowing = state.following

            actualFollowing.splice(actualFollowing.indexOf(action.username), 1)

            const updatedState = {
                ...state,
                following: actualFollowing
            }

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedState))

            return updatedState
        }
    }
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, UserInitialState)
    const contextValue = useMemo(() => ({state, dispatch}), [state, dispatch])

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserProvider