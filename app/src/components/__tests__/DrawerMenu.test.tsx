import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { BrowserRouter } from "react-router-dom";

// jest.mock("../DrawerMenu/DrawerMenu", () => {
//   const originalModule = jest.requireActual("../DrawerMenu/DrawerMenu");
//   return {
//     __esModule: true,
//     ...originalModule,
//     toggleDrawer: jest.fn(),
//   };
// });

afterEach(cleanup);

describe("DrawerMenu component test", () => {
  test("returns button element for opening drawer menu", () => {
    const { container } = render(<DrawerMenu isAuthenticated={false} />);

    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button).toBeDefined();
  });

  test("returns drawer with page list (Home page) if user is not authenticated", async () => {
    const { container } = render(
      <BrowserRouter>
        <DrawerMenu isAuthenticated={false} />
      </BrowserRouter>
    );

    const bttn = container.querySelector("button") as HTMLButtonElement;
    fireEvent.click(bttn);
    await waitFor(() => {
      const anchorHome = screen.getAllByText("Home");
      expect(anchorHome).toBeDefined();
    });
  });

  test("returns drawer with page list (Home page, Cities page) if user is authenticated", async () => {
    const { container } = render(
      <BrowserRouter>
        <DrawerMenu isAuthenticated={true} />
      </BrowserRouter>
    );

    const bttn = container.querySelector("button") as HTMLButtonElement;
    fireEvent.click(bttn);
    await waitFor(() => {
      const anchorHome = screen.getAllByText("Home");
      const anchorCities = screen.getAllByText("Cities");
      expect(anchorHome).toBeDefined();
      expect(anchorCities).toBeDefined();
    });
  });
});
