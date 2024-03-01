import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// Interface for a repl's inputs
interface ControlledInputProps {
  value: string;
  //   Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Sets the input box to the text given by user, sets placeholder text. Manages
 * the state of the input box.
 * @param param0
 * @returns the box
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
