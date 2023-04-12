import { City } from "../types";
import { extractName } from "../extractName";

// export const extractName = (data?: City[]): string[] => {
//   const result = data && data.map((city: City) => city.cityName);

//   return result ?? [];
// };

describe("extracName from the City object", () => {
  const cityList: City[] = [
    {
      _id: "001",
      cityName: "Bratislava",
      userValue: "1",
      isDefault: false,
    },
    {
      _id: "002",
      cityName: "Kosice",
      userValue: "1",
      isDefault: false,
    },
  ];

  test("returns stings with the length 2", () => {
    expect(extractName(cityList).length).toBe(2);
  });
});
