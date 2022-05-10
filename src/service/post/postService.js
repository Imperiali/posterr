const postService = () => {
    return new Promise((resolve) => setTimeout(() => {
        resolve([
            {
                user: 'TonyStark',
                message: 'Finally buy Posterr, great acquisition',
                likes: [],
                type: 'original',
                createdAt: '05-09-2022'
            },
            {
                user: 'MaryJane',
                message: 'Can\'t wait to see Peter <3',
                likes: [],
                type: 'original',
                createdAt: '05-09-2022'
            },
            {
                user: 'HarryOsborn',
                message: 'Back to the lab, better have someone working on there today',
                likes: [],
                type: 'original',
                createdAt: '05-09-2022'
            },
            {
                user: 'DrStrange',
                message: 'Let\'s tru this spell again, hope not to be interrupted',
                likes: [],
                type: 'original',
                createdAt: '05-09-2022'
            }
        ])
    }, 3000))
}

export default postService