import Home from "../../components/pages/home";
import PostsProvider from "../../components/shared/PostsProvider";
import UsersProvider from "../../components/shared/UsersProvider";
import { Outlet } from "react-router-dom";
import UserProvider from "../../components/shared/UserProvider";

const HomePage = () => {
  return (
    <UserProvider>
      <UsersProvider>
        <PostsProvider>
          <Outlet />
          <Home />
        </PostsProvider>
      </UsersProvider>
    </UserProvider>
  );
};

export default HomePage;
