import { useState } from "react";
import { REPLFunction } from "./REPLFunction";
import { mockedPresidentData } from "../../data/us-presidents";

let currData: string[][];

type FileToDataMap = {
  [key: string]: string[][];
};

const fileToData: FileToDataMap = {
  "data/presidents.csv": mockedPresidentData,
};

export function useFunctionLibrary() {
  const sampleFunction: REPLFunction = (
    args: Array<string>
  ): String | String[][] => {
    console.log("function called!");
    return "";
  };

  const load: REPLFunction = (args: Array<string>): String => {
    // get data from filename
    // set state variable currData to be data
    currData = fileToData[args[1]];
    console.log(currData);
    return "Succesfully loaded!";
  };

  return { sampleFunction, load };
}
