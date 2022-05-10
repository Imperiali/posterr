import React, {useMemo} from "react";
import {useReducer} from "react";

const USERS_KEY = 'posterrUsers'
export const UsersContext = React.createContext()
const UsersInitialState = [
    {
        name: 'TonyStark',
        avatarUrl: 'https://picsum.photos/200',
        followers: ['HarryOsborn', 'MaryJane', 'PeterParker', 'Dr Strange'],
        following: ['HarryOsborn', 'Dr Strange'],
        createdAt: '03-01-2022'
    },
    {
        name: 'DrStrange',
        avatarUrl: 'https://picsum.photos/200',
        followers: ['HarryOsborn', 'MaryJane', 'PeterParker', 'TonyStark'],
        following: ['TonyStark'],
        createdAt: '03-01-2022'
    },
    {
        name: 'MaryJane',
        avatarUrl: 'https://picsum.photos/200',
        followers: ['HarryOsborn','PeterParker'],
        following: ['HarryOsborn', 'PeterParker', 'TonyStark', 'DrStrange'],
        createdAt: '03-01-2022'
    },
    {
        name: 'HarryOsborn',
        avatarUrl: 'https://picsum.photos/200',
        followers: ['TonyStark', 'PeterParker', 'MaryJane'],
        following: ['MaryJane', 'PeterParker', 'TonyStark', 'DrStrange'],
        createdAt: '03-01-2022'
    }
]
export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            let users = localStorage.getItem(USERS_KEY)

            if (!users) {
                localStorage.setItem(USERS_KEY, JSON.stringify(UsersInitialState))
                return UsersInitialState
            }

            return [
                ...JSON.parse(users)
            ]
    }
}
const UsersProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersReducer, UsersInitialState)
    const contextValue = useMemo(() => ({state, dispatch}), [state, dispatch])

    return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>
}

export default UsersProvider