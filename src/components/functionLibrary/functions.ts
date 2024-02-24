import { useState } from "react";
import { REPLFunction } from "./REPLFunction";
import { mockedPresidentData } from "../../data/us-presidents";

type FileToDataMap = {
  [key: string]: string[];
};

const fileToData: FileToDataMap = {
  "data/presidents.csv": mockedPresidentData,
};

export function useFunctionLibrary() {
  const [currData, setCurrData] = useState<string[]>([]); // state variable to hold currently loaded dataset

  const sampleFunction: REPLFunction = (
    args: Array<string>
  ): String | String[][] => {
    console.log("function called!");
    return "";
  };

  const load: REPLFunction = (args: Array<string>): String | String[][] => {
    // get data from filename
    // set state variable currData to be data
    setCurrData(fileToData[args[1]]);
    return "Succesfully loaded!";
  };

  return { sampleFunction, load };
}
