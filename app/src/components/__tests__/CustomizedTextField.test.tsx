import { fireEvent, render } from "@testing-library/react";
import { CustomizedTextField } from "../Input/CustomizedTextField";

const onChangeMock = jest.fn();

describe("CustomizedTextField component test", () => {
  test("returns input element with all attributes defined", () => {
    const { container } = render(
      <CustomizedTextField
        type={"email"}
        onChange={onChangeMock}
        value={"test@gmail.com"}
        name={"email"}
      />
    );
    const inputElement = container.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    expect(inputElement.type).toBe("email");
    expect(inputElement.name).toBe("email");
    expect(inputElement.value).toBe("test@gmail.com");
    expect(inputElement.required).toBeTruthy();
  });

  test("returns input element that has onChange event handler", () => {
    const { container } = render(
      <CustomizedTextField
        type={"email"}
        onChange={onChangeMock}
        value={""}
        name={"email"}
      />
    );
    const inputElement = container.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "newEmail@gmail.com" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("newEmail@gmail.com");
  });
});
