import Navbar from "../../shared/navbar";
import Input from "../../shared/input";
import usePost from "../../shared/PostsProvider/usePost";
import useUser from "../../shared/UserProvider/useUser/useUser";
import {useEffect} from "react";
import useUsers from "../../shared/UsersProvider/useUsers";
import Feed from "../../shared/feed";
import postService from "../../../service/post";

const Home = () => {
    const { fetchCurrentUser } = useUser()
    const { fetchUsers } = useUsers()
    const { fetchPosts, setLoading } = usePost()

    useEffect(() => {
        fetchCurrentUser()
        fetchUsers()
        const resolvePosts = async () => {
            setLoading(true)
            const posts = await postService()
            fetchPosts(posts)
            setLoading(false)
        }
        resolvePosts()
    }, [])

    return <div className="bg-gray-50 dark:bg-gray-700 h-screen">
        <Navbar/>
        <div className="m-4">
            <Input/>
        </div>
        <Feed/>
    </div>
}

export default Home