import { render, waitFor } from "@testing-library/react";
import Home from "./home";
import Navbar from "../../shared/navbar";
import Input from "../../shared/input";
import usePost from "../../shared/PostsProvider/usePost";
import useUser from "../../shared/UserProvider/useUser/useUser";
import useUsers from "../../shared/UsersProvider/useUsers";
import Feed from "../../shared/feed";

import UsersProvider from "../../shared/UsersProvider";
import UserProvider from "../../shared/UserProvider";
import PostsProvider from "../../shared/PostsProvider";

jest.mock("../../shared/PostsProvider", () =>
  jest.fn(({ children }) => children)
);
jest.mock("../../shared/UsersProvider", () =>
  jest.fn(({ children }) => children)
);
jest.mock("../../shared/UserProvider", () =>
  jest.fn(({ children }) => children)
);
jest.mock("../../shared/navbar");
jest.mock("../../shared/input");
jest.mock("../../shared/PostsProvider/usePost");
jest.mock("../../shared/UserProvider/useUser/useUser");
jest.mock("../../shared/UsersProvider/useUsers");
jest.mock("../../shared/feed");
jest.mock("../../../service/post");

describe("Home()", function () {
  it("should render core components correctly", function () {
    render(
      <UserProvider>
        <UsersProvider>
          <PostsProvider>
            <Home />
          </PostsProvider>
        </UsersProvider>
      </UserProvider>
    );
    waitFor(() => {
      expect(Navbar).toBeCalled();
      expect(Input).toBeCalled();
      expect(Feed).toBeCalled();
    });
  });

  it("should use hook to fetch user", function () {
    useUser.mockImplementationOnce(() => ({
      fetchCurrentUser: jest.fn(),
    }));
    render(
      <UserProvider>
        <UsersProvider>
          <PostsProvider>
            <Home />
          </PostsProvider>
        </UsersProvider>
      </UserProvider>
    );

    waitFor(() => {
      expect(useUser).toBeCalled();
      expect(useUser.fetchCurrentUser).toBeCalled();
    });
  });

  it("should use hook to fetch users", function () {
    useUsers.mockImplementationOnce(() => ({
      fetchUsers: jest.fn(),
    }));
    render(
      <UserProvider>
        <UsersProvider>
          <PostsProvider>
            <Home />
          </PostsProvider>
        </UsersProvider>
      </UserProvider>
    );

    waitFor(() => {
      expect(useUsers).toBeCalled();
      expect(useUsers.fetchUsers).toBeCalled();
    });
  });

  it("should use hook to fetch posts", function () {
    usePost.mockImplementationOnce(() => ({
      fetchPosts: jest.fn(),
    }));
    render(
      <UserProvider>
        <UsersProvider>
          <PostsProvider>
            <Home />
          </PostsProvider>
        </UsersProvider>
      </UserProvider>
    );

    waitFor(() => {
      expect(usePost).toBeCalled();
      expect(usePost.fetchPosts).toBeCalled();
    });
  });
});
