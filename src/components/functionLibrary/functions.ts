import { useState } from "react";
import { REPLFunction } from "./REPLFunction";
import {
  mockedDataResults,
  mockedMetGalaGuests,
  mockedPresidentData,
  mockedMetResults,
  mockedAlejandroMetResults,
  mockedEmptyData,
} from "../../data/mocked-data";

let currData: String[][];
let mockedHeader: Boolean = false;

let verbose: Boolean = false;

type FileToDataMap = {
  [key: string]: string[][];
};

const fileToData: FileToDataMap = {
  "data/presidents.csv": mockedPresidentData,
  "data/met-gala.csv": mockedMetGalaGuests,
  "data/empty-file.csv": mockedEmptyData,
};

const searchToData: FileToDataMap = {
  "0 Jinho": mockedDataResults,
  "theme Camp": mockedMetResults,
  'designer "Saint Laurent"': mockedAlejandroMetResults,
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
    } else if (args[2] == null) {
      return "Please indicate if the file has a header.";
    } else if (args[3] != null) {
      return "Too many arguments.";
    }

    if (fileToData[args[1]] == null) {
      return "File not found";
    }

    currData = fileToData[args[1]];

    if (args[2] === "true") {
      mockedHeader = true;
    } else if (args[2] === "false") {
      mockedHeader = false;
    } else {
      return "Invalid header indication.";
    }

    console.log(currData);
    if (verbose) {
      return [[args[0] + " " + args[1]], ["Successfully loaded!"]];
    }
    return "Successfully loaded!";
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

        if (currData[0].length == 0) {
          result = result.concat([["Loaded CSV file is empty"]]);
        } else {
          result = result.concat(currData);
        }
        console.log(result);
        return result;
      } else {
        return [[args[0]], [" No data loaded"]];
      }
    } else {
      // if we are in brief mode
      if (currData != null) {
        if (currData[0].length == 0) {
          return "Loaded CSV file is empty";
        } else {
          return currData;
        }
      }
      return "No data loaded";
    }
  };

  const search: REPLFunction = (args: Array<string>): String[][] | String => {
    console.log(args);
    // check for additional inputs
    if (args[3] != null) {
      return "Too many arguments";
    }
    if (args[1] == null || args[2] == null) {
      return "Not enough arguments";
    }

    if (currData != null) {
      let result = searchToData[args[1] + " " + args[2]];
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
