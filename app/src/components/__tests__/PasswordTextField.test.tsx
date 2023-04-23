import { PasswordTextField } from "../Input/PasswordTextField";
import { fireEvent, render } from "@testing-library/react";

const changeHandler = jest.fn();

describe("PasswordTextField component test", () => {
  test("returns input element with all attributes defined without error message", () => {
    const { container } = render(
      <PasswordTextField
        value={"Test123"}
        name={"password"}
        onChange={changeHandler}
      />
    );
    const inputElement = container.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    const errorMessage = container.querySelectorAll("p");
    expect(inputElement).toBeDefined();
    expect(inputElement.type).toBe("password");
    expect(inputElement.name).toBe("password");
    expect(inputElement.value).toBe("Test123");
    expect(inputElement.required).toBeTruthy();
    expect(errorMessage.length).toBe(0);
  });

  test("returns input element that has onChange event handler", () => {
    const { container } = render(
      <PasswordTextField
        value={"Test123"}
        name={"password"}
        onChange={changeHandler}
      />
    );
    const inputElement = container.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "NewPassword123" } });
    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler).toHaveBeenCalledWith("NewPassword123");
  });

  test("return input element with error", () => {
    const { container } = render(
      <PasswordTextField
        value={"Test123"}
        name={"password"}
        onChange={changeHandler}
        isNotSame={true}
      />
    );
    const errorMessage = container.getElementsByTagName(
      "p"
    )[0] as HTMLParagraphElement;
    expect(errorMessage).toBeDefined();
    expect(errorMessage.textContent).toBe("Passwords do not match.");
  });

  test("returns input element with icon for switching show/hide password", () => {
    const { container } = render(
      <PasswordTextField
        value={"Test123"}
        name={"password"}
        onChange={changeHandler}
        isNotSame={true}
      />
    );
    const inputElement = container.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    const buttonIcon = container.getElementsByTagName(
      "button"
    )[0] as HTMLButtonElement;
    expect(buttonIcon).toBeDefined();
    expect(inputElement.type).toBe("password");
    fireEvent.click(buttonIcon);
    expect(inputElement.type).toBe("text");
  });
});
