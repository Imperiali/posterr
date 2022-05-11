import { render, waitFor } from "@testing-library/react";
import HomePage from "./homePage";
import Home from "../../components/pages/home";
import PostsProvider from "../../components/shared/PostsProvider";
import UsersProvider from "../../components/shared/UsersProvider";
import { Outlet } from "react-router-dom";
import UserProvider from "../../components/shared/UserProvider";

jest.mock("../../components/pages/home", () => jest.fn(() => null));
jest.mock("../../components/shared/PostsProvider", () =>
  jest.fn(({ children }) => children)
);
jest.mock("../../components/shared/UsersProvider", () =>
  jest.fn(({ children }) => children)
);
jest.mock("../../components/shared/UserProvider", () =>
  jest.fn(({ children }) => children)
);
jest.mock("react-router-dom");

describe("HomePage()", function () {
  it("should render with providers and Outlet", function () {
    render(<HomePage />);

    waitFor(() => {
      expect(Home).toBeCalled();
      expect(PostsProvider).toBeCalled();
      expect(UsersProvider).toBeCalled();
      expect(UserProvider).toBeCalled();
      expect(Outlet).toBeCalled();
    });
  });
});
