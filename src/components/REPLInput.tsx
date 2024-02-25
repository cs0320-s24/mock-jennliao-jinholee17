import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./functionLibrary/REPLFunction";
import { sampleFunction } from "./functionLibrary/sampleFunction";
import { useFunctionLibrary } from "./functionLibrary/functions";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: String[][][];
  setHistory: Dispatch<SetStateAction<String[][][]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  type StringToFunctionMap = {
    [key: string]: REPLFunction;
  };

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  function setupCommands() {
    const functionMap: StringToFunctionMap = {};

    // Add functions to the map
    // functionMap["view"] = () => {};

    // functionMap["load"] = () => {};

    // functionMap["search"] = () => {};
    // functionMap["mode"] = () => {};

    functionMap["sample"] = sampleFunction;

    return functionMap;
  }
  function handleSubmit(commandString: string) {
    setCount(count + 1);

    // parsing commandString:
    let tokens: string[] = []; // create tokens array
    tokens = commandString.split(" ");

    // setupCommands();
    let functionMap: StringToFunctionMap = setupCommands();

    // functionMap[tokens[0]](tokens); // calling relevant function
    functionMap = useFunctionLibrary();
    let resultStrings: String[][] = [[]];
    const result = functionMap[tokens[0]](tokens);

    if (typeof result === "string") {
      // when returns String
      resultStrings[0].push(result);
    } else if (Array.isArray(result)) {
      // when returns String[][]
      resultStrings = result; // calling relevant function
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
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button aria-label={"Submit"} onClick={() => handleSubmit(commandString)}>
        Submitted {count} times!
      </button>
    </div>
  );
}
