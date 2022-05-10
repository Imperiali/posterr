import {Link, useLocation} from "react-router-dom";
import useUser from "../UserProvider/useUser/useUser";
import Profile from "../../../../assets/Profile";

const Navbar = () => {
    const { name } = useUser()
    const location = useLocation()

    const pathToProfile = location.pathname !== '/' ? `${location.pathname}/profile/${name}` : `/profile/${name}`

    return (
        <nav className="bg-black border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to='/' className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Posterr</span>
                </Link>
                <Link to={pathToProfile}>
                    <Profile />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar