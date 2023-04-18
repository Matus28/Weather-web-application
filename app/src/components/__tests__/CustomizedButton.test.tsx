import { fireEvent, render } from "@testing-library/react";
import { BlueStyledButton, CircleButton } from "../Button/CustomizedButton";

describe("BlueStyledButton and CircleButton test", () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("BlueStyledButton renders as button", () => {
    const { container } = render(<BlueStyledButton />);
    const button = container.getElementsByTagName("button")[0];
    expect(button).toBeDefined();
  });

  test("BlueStyledButton fires a function upon click", () => {
    const { container } = render(<BlueStyledButton onClick={mockOnClick} />);
    const button = container.getElementsByTagName(
      "button"
    )[0] as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    button;
  });

  test("CircleButton renders as button", () => {
    const { container } = render(<CircleButton />);
    const button = container.getElementsByTagName("button")[0];
    expect(button).toBeDefined();
  });

  test("CircleButton fires a function upon click", () => {
    const { container } = render(<CircleButton onClick={mockOnClick} />);
    const button = container.getElementsByTagName(
      "button"
    )[0] as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    button;
  });
});
