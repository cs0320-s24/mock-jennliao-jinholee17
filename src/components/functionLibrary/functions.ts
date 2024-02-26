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

  const load: REPLFunction = (args: Array<string>): String | String[][] => {
    // get data from filename
    // set state variable currData to be data

    if (args[1] == null) {
      return "Please input a file.";
    } else if (args[2] != null) {
      return "Too many arguments.";
    }

    if (fileToData[args[1]] == null) {
      return "File not found";
    }

    currData = fileToData[args[1]];
    console.log(currData);
    if (verbose) {
      return [[args[0] + " " + args[1]], ["Successfully loaded!"]];
    }
    return "Succesfully loaded!";
  };

  const view: REPLFunction = (args: Array<string>): String[][] | String => {
    let result: String[][] = [[]];
    if (verbose) {
      result[0] = [args[0]];
      result = result.concat(currData);
      //   result[0].push(args[0] + " " + currData);
      console.log(result);
      return result;
    } else {
      if (currData != null) {
        // result.push(currData);
        return currData;
      }
      if (verbose) {
        return [[args[0]], [" No data loaded"]];
      }
      return "No data loaded";
    }
  };

  const search: REPLFunction = (args: Array<string>): String[][] | String => {
    if (verbose) {
      let returnList: String[][] = [[args[0] + " " + args[1] + " " + args[2]]];
      returnList = returnList.concat(fileToData[args[1] + " " + args[2]]);
      console.log(returnList);
      return returnList;
    }
    return fileToData[args[1] + " " + args[2]];
  };

  const mode: REPLFunction = (args: Array<string>): String => {
    if (args[1] != null) {
      return "Incorrect number of arguments";
    } else {
      verbose = !verbose;

      if (verbose) {
        return "Verbose mode was changed to verbose";
      } else {
        return "Verbose mode was changed to brief";
      }
    }
  };

  return { sampleFunction, load, mode, view, search };
}
