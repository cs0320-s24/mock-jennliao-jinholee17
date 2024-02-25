import { useState } from "react";
import { REPLFunction } from "./REPLFunction";
import { mockedDataResults, mockedPresidentData } from "../../data/mocked-data";

let currData: String[][];
let verbose: Boolean = false;

type FileToDataMap = {
  [key: string]: string[][];
};

const fileToData: FileToDataMap = {
  "data/presidents.csv": mockedPresidentData,
  "0 Jinho": mockedDataResults,
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
    if (verbose) {
      return args[0] + " " + args[1] + " \n" + "Successfully loaded!";
    }
    return "Succesfully loaded!";
  };

  const view: REPLFunction = (args: Array<string>): String[][] | String => {
    let result: String[][] = [[]];
    if (verbose) {
      result[0].push(args[0] + " " + currData);
      return result;
    }
    if (currData != null) {
      // result.push(currData);
      return currData;
    }
    if (verbose) {
      return args[0] + " No data loaded";
    }
    return "No data loaded";
  };
  const search: REPLFunction = (args: Array<string>): String[][] | String => {
    if (verbose) {
      return args[0] + " " + fileToData[args[1] + " " + args[2]];
    }
    return fileToData[args[1] + " " + args[2]];
  };

  const mode: REPLFunction = (args: Array<string>): String => {
    verbose = !verbose;
    return "Verbose mode changed to " + verbose;
  };

  return { sampleFunction, load, mode, view, search };
}
