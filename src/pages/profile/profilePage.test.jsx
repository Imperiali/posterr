import { render } from "@testing-library/react";
import ProfilePage from "./profilePage";
import Profile from "../../components/pages/profile";

jest.mock("../../components/pages/profile");

describe("ProfilePage()", function () {
  it("should render profile", function () {
    render(<ProfilePage />);

    expect(Profile).toBeCalled();
  });
});
