import { render } from "@testing-library/react";
import { SearchCityInput } from "../Input/SearchCityInput";

const changeHandler = jest.fn();
const useSnackBar = jest.fn();

describe("SearchCityInput component test", () => {
  test("...", () => {
    const { container } = render(
      <SearchCityInput value={"TestCity"} onChangeValue={changeHandler} />
    );
    const inputElement = container.getElementsByTagName(
      "input"
    )[0] as HTMLInputElement;
    expect(inputElement).toBeDefined();
    expect(inputElement.type).toBe("text");
    expect(inputElement.value).toBe("TestCity");
    expect(inputElement.required).toBeTruthy();
  });
});
