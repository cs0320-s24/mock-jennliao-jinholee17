import { Dispatch, SetStateAction } from "react";

/**
 * Fields for the login button
 */
interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * Creates and returns a login button
 * @param props
 * @returns login button
 */
export function LoginButton(props: loginProps) {
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };

  if (props.isLoggedIn) {
    return (
      <button
        className="logInButton"
        aria-label="Sign Out"
        onClick={authenticate}
      >
        Sign out
      </button>
    );
  } else {
    return (
      <button className="logInButton" aria-label="Login" onClick={authenticate}>
        Login
      </button>
    );
  }
}
