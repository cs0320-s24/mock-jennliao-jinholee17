import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./functionLibrary/REPLFunction";
import { useFunctionLibrary } from "./functionLibrary/functions";

/**
 * Fields to keep track of the history
 */
interface REPLInputProps {
  history: String[][][];
  setHistory: Dispatch<SetStateAction<String[][][]>>;
}

/**
 * Function that handles function calls inside the repl, and
 * updates the state
 * @param props
 * @returns
 */
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  type StringToFunctionMap = {
    [key: string]: REPLFunction;
  };

  /**
   * Creates a function map of strings to function calls
   */
  function setupCommands() {
    const functionMap: StringToFunctionMap = {};
    return functionMap;
  }
  /**
   * Fills the function map of commands, parses
   * user input for a command. Updates history. Handles submit button.
   * @param commandString
   */
  function handleSubmit(commandString: string) {
    setCount(count + 1);

    // parsing commandString:
    const tokens = commandString.match(/(?:[^\s"]+|"[^"]*")/g);

    let functionMap: StringToFunctionMap = setupCommands();

    functionMap = useFunctionLibrary();
    let resultStrings: String[][] = [[]];

    if (tokens != null) {
      if (typeof functionMap[tokens[0]] !== "function") {
        resultStrings[0].push("Invalid command");
      } else {
        const result = functionMap[tokens[0]](tokens);
        if (result == null) {
          // unsure if we need this / if this ever happens
          resultStrings[0].push("Invalid command");
        }

        if (typeof result === "string") {
          // when returns String
          resultStrings[0].push(result);
        } else if (Array.isArray(result)) {
          // when returns String[][]
          resultStrings = result; // calling relevant function
        }
      }
    }

    // if verbose add commandString to resultStrings.addFirst(0)
    props.setHistory([...props.history, resultStrings]);
    setCommandString("");
  }
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        className="submitButton"
        aria-label={"Submit"}
        onClick={() => handleSubmit(commandString)}
      >
        Submit
      </button>
    </div>
  );
}
