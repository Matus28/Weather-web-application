import { render } from "@testing-library/react";
import { AirConditionElement } from "../AirCondition/AirConditionElement";
import { AirConditionData } from "../../utils/types";

const airConditionData: AirConditionData = {
  condition: "Wind speed",
  iconURL: "/image.png",
  value: 5,
  variable: "wind_speed",
  unit: "km/h",
};

describe("tests AirConditionElement component", () => {
  test("should render element with the Title Wind speed", () => {
    const { container } = render(
      <AirConditionElement data={airConditionData} />
    );
    const title = container.getElementsByClassName(
      "air-condition-element__title"
    )[0];
    expect(title.textContent).toBe("Wind speed");
  });

  test("should render image element", () => {
    const { container } = render(
      <AirConditionElement data={airConditionData} />
    );
    const weatherIMG = container.querySelectorAll("img")[0] as HTMLImageElement;
    expect(weatherIMG.alt).toContain("Image of condition's symbol");
    expect(weatherIMG.src).toContain("/image.png");
  });

  test("should render element with right wind speed value", () => {
    const { container } = render(
      <AirConditionElement data={airConditionData} />
    );

    const temp = container.querySelector(".air-condition-element__value");
    expect(temp?.textContent).toBe("5 km/h");
  });
});
