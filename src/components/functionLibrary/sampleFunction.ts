import { REPLFunction } from "./REPLFunction";

const sampleFunction: REPLFunction = (
  args: Array<string>
): String | String[][] => {
  console.log("function called!");
  return "";
};

export { sampleFunction };
