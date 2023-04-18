import { Card } from "../Card/Card";
import { render, screen } from "@testing-library/react";

describe("Card component test", () => {
  test("returns div element with class card-body and with textContent attribute", () => {
    const { container } = render(<Card>Text</Card>);
    const divComp = container.getElementsByClassName(
      "card-body"
    )[0] as HTMLDivElement;
    const text = screen.getByText("Text");
    expect(divComp).toBeDefined();
    expect(text.textContent).toBe("Text");
  });

  test("returns div element with class with specific color name (red)", () => {
    const { container } = render(<Card color="red">Text</Card>);
    const divComp = container.getElementsByClassName(
      "card-body red"
    )[0] as HTMLDivElement;
    expect(divComp).toBeDefined();
  });

  test("returns div element that is selected (active)", () => {
    const { container } = render(<Card isSelected={true}>Text</Card>);
    const divComp = container.getElementsByClassName(
      "card-body active"
    )[0] as HTMLDivElement;
    expect(divComp).toBeDefined();
  });

  test("returns div element with subclass to specie for which element is card render", () => {
    const { container } = render(<Card class="current-weather">Text</Card>);
    const divComp = container.getElementsByClassName(
      "card-body current-weather"
    )[0] as HTMLDivElement;
    expect(divComp).toBeDefined();
  });
});
