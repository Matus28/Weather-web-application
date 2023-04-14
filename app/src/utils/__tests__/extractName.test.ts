import { City } from "../types";
import { extractName } from "../extractName";

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

describe("extracName - function for extracting city name from the City object", () => {
  test("returns string array with the length 2", () => {
    expect(extractName(cityList).length).toBe(2);
  });

  test("return string of the first city Bratislava", () => {
    expect(extractName(cityList)[0]).toBe("Bratislava");
  });

  test("return string of the second city Kosice", () => {
    expect(extractName(cityList)[1]).toBe("Kosice");
  });

  test("returns empty array if props are not given", () => {
    expect(extractName().length).toBe(0);
  });
});
