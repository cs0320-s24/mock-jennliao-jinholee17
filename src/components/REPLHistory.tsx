import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: String[][][];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}

      {props.history.map((result) => (
        // make a table for each result
        <table>
          {result.map((row) => (
            // make a row for each list in the result
            <tr>
              {row.map((element) => (
                <td> {element} </td>
              ))}
            </tr>
          ))}
        </table>
      ))}
    </div>
  );
}
