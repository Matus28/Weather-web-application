import { WeatherCondition } from "./types";
import { ConditionImages, ConditionImagesURL } from "../data/conditions";

export const selectImage = (
  data: WeatherCondition,
  isDay: boolean,
  type: string
): string => {
  const dayTime = isDay ? "day" : "night";
  const condition = data.text;

  const filteredCondition = ConditionImagesURL.filter(
    (imageCondition: ConditionImages) => imageCondition.condition === condition
  )[0];

  if (!filteredCondition) return "";

  const filteredType =
    filteredCondition[type === "current" ? "current" : "forecast"];

  return filteredType[dayTime === "day" ? "day" : "night"];
};
