import * as React from "react";
import { render, screen } from "@testing-library/react";
import { AirConditionElement } from "../AirCondition/AirConditionElement";
import { AirConditionData } from "../../utils/types";

const airConditionData = {
  condition: "Sunny",
  iconURL: "/image.png",
  value: 34,
  variable: "temp",
  unit: "°C",
};

describe("tests AirConditionElement component", () => {
  test("should render element from airConditionData variable", () => {
    const { container } = render(
      <AirConditionElement data={airConditionData} />
    );

    expect(
      container.getElementsByClassName("air-condition-element__title")[0]
        .textContent
    ).toBe("Sunny");
  });
});

// export const AirConditionElement = (props: {
//   data: AirConditionData;
// }): JSX.Element => {
//   return (
//     <div className="air-condition-element">
//       <div className="air-condition-element__description">
//         <img src={props.data.iconURL} alt="Image of condition's symbol" />
//         <div className="air-condition-element__title">
//           {props.data.condition}
//         </div>
//       </div>
//       <div className="air-condition-element__value">
//         {`${props.data.value} ${props.data.unit}`}
//       </div>
//     </div>
//   );
// };
