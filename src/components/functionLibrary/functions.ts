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

    // checking extra inputs
    if (args[1] != null) {
      return "Too many arguments";
    }

    if (verbose) {
      // if we are in verbose mode
      if (currData != null) {
        result[0] = [args[0]];
        result = result.concat(currData);
        console.log(result);
        return result;
      } else {
        return [[args[0]], [" No data loaded"]];
      }
    } else {
      // if we are in brief mode
      if (currData != null) {
        return currData;
      }
      return "No data loaded";
    }
  };

  const search: REPLFunction = (args: Array<string>): String[][] | String => {
    // check for additional inputs
    if (args[3] != null) {
      return "Too many arguments";
    }

    if (currData != null) {
      let result = fileToData[args[1] + " " + args[2]];
      if (result == null) {
        return "No results found";
      }
      if (verbose) {
        let returnList: String[][] = [
          [args[0] + " " + args[1] + " " + args[2]],
        ];
        returnList = returnList.concat(result);
        console.log(returnList);
        return returnList;
      }
      return result;
    } else {
      // no file loaded
      if (verbose) {
        let returnList: String[][] = [
          [args[0] + " " + args[1] + " " + args[2]],
        ];
        returnList = returnList.concat([["No data loaded"]]);
        return returnList;
      } else {
        return "No data loaded";
      }
    }
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
