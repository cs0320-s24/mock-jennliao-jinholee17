import "../styles/main.css";

interface REPLHistoryProps {
  history: String[][][];
}
/**
 * Handles the repl history, puts all the data in a table.
 * @param props
 * @returns
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {/* This is where command history will go */}
      {}

      {props.history.map((result) => (
        // make a table for each result
        <table className="repl-table" aria-label="repl-table">
          {result.map((row) => (
            // make a row for each list in the result
            <tr className="repl-row" aria-label="repl-row">
              {row.map((element) => (
                <td
                  className="repl-element"
                  aria-label="repl-element"
                  colSpan={row[0].length === 1 ? row.length : 1}
                >
                  {" "}
                  {element}{" "}
                </td>
              ))}
            </tr>
          ))}
        </table>
      ))}
    </div>
  );
}
