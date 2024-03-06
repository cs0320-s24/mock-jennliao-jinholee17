import { useState } from "react";
import { REPLFunction } from "./REPLFunction";
import {
  mockedDataResults,
  mockedMetGalaGuests,
  mockedPresidentData,
  mockedMetResults,
  mockedAlejandroMetResults,
  mockedEmptyData,
  mockedInvalidColumnIdentifier,
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
  "city Boston": mockedInvalidColumnIdentifier,
  "theme Camp": mockedMetResults,
  'designer "Saint Laurent"': mockedAlejandroMetResults,
};

/**
 * This is our function which defines every function that you can input into
 * the REPL. These include load, view, search, and mode. This 'library' is super
 * abstract in how we use it, so a developer could easily add more commands to this
 * library if they wanted to, and it would automatically work in the higher levels of the
 * design.
 * @returns the functions, so that they can be used in a different  class.
 */
export function useFunctionLibrary() {
  /**
   * sampleFunction to show the flexibility of our design in terms of adding new methods. A
   * developer could easily define their own method and add it to this list if they wanted
   * it to be functional in the repl, and then the repl would automatically work with it the
   * way we have abstracted it.
   * @param args
   * @returns empty string
   */
  const sampleFunction: REPLFunction = (
    args: Array<string>
  ): String | String[][] => {
    console.log("function called!");
    return "";
  };

  /**
   *  Loads a file into the CSV
   * @param args: arg[1] = file name
   * @returns different strings based on correct/incorrect input
   */
  const load: REPLFunction = (args: Array<string>): String | String[][] => {
    // get data from filename
    // set state variable currData to be data

    if (args[1] == null) {
      if (verbose) {
        return [
          [args[0] + " " + args[1] + " " + args[2]],
          ["Please input a file."],
        ];
      } else {
        return "Please input a file.";
      }
    } else if (args[2] == null) {
      if (verbose) {
        return [
          [args[0] + " " + args[1] + " " + args[2]],
          ["Please indicate if the file has a header."],
        ];
      } else {
        return "Please indicate if the file has a header.";
      }
    } else if (args[3] != null) {
      if (verbose) {
        return [
          [args[0] + " " + args[1] + " " + args[2]],
          ["Too many arguments."],
        ];
      } else {
        return "Too many arguments.";
      }
    }

    if (fileToData[args[1]] == null) {
      if (verbose) {
        return [[args[0] + " " + args[1] + " " + args[2]], ["File not found"]];
      } else {
        return "File not found";
      }
    }

    currData = fileToData[args[1]];

    if (args[2] === "true") {
      mockedHeader = true;
    } else if (args[2] === "false") {
      mockedHeader = false;
    } else {
      if (verbose) {
        return [
          [args[0] + " " + args[1] + " " + args[2]],
          ["Invalid header indication."],
        ];
      } else {
        return "Invalid header indication.";
      }
    }

    if (verbose) {
      return [
        [args[0] + " " + args[1] + " " + args[2]],
        ["Successfully loaded!"],
      ];
    }
    return "Successfully loaded!";
  };

  /**
   * Returns a file in a double list of strings format, if it is loaded
   * @param args: arg[0] = 'view', everything else should be empty
   * @returns the currently loaded data
   */
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

  /**
   * Searches a CSV file for a given value based on header value or column index
   * @param args arg[1] = column identifier, arg[2] = value to search
   * @returns the row(s) that contain the value
   */
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

  /**
   * Switches the repl history to verbose or brief, which either shows
   * the command in history or not.
   * @param args
   * @returns
   */
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
