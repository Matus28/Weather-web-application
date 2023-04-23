import { render } from "@testing-library/react";
import Loading from "../Loading/Loading";

describe("Loading component test", () => {
  test("returns div element with loading animation", () => {
    const { container } = render(<Loading />);
    const sectionEl = container.getElementsByClassName("sec-loading")[0];
    const divElement = container.getElementsByTagName("one")[0];
    expect(sectionEl).toBeDefined();
    expect(divElement).toBeDefined;
  });
});
