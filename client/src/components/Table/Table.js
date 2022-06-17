import "./Table.css";
import { orgnizeData } from "./orgnizeData";

export const Table = (props) => {
  const { rows } = orgnizeData(props.history, props.headers);

  const tableHeaders = props.headers.map((header) => <th>{header}</th>);
  const tableRows = rows
    ? rows.map((row) => (
        <tr>
          {row.map((cell) => (
            <td>{cell}</td>
          ))}
        </tr>
      ))
    : "";
  const tableFooter = props.footer
    ? props.footer.map((cell) => <td>{cell}</td>)
    : "";

  return (
    <table className="Table">
      <thead>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>{tableRows}</tbody>
      <tfoot>
        <tr>{tableFooter}</tr>
      </tfoot>
    </table>
  );
};
