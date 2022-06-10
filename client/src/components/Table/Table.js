import "./Table.css";

export const Table = (props) => {
  const headers = ["symbol", "name", "count", "price", "total"].map(
    (header) => <th>{header}</th>
  );
  const rows = props.rows
    ? props.rows.map((row) => (
        <tr>
          {row.map((cell) => (
            <td>{cell}</td>
          ))}
        </tr>
      ))
    : "";
  const footer = props.footer
    ? props.footer.map((cell) => <td>{cell}</td>)
    : "";

  return (
    <table className="Table">
      <tr>{headers}</tr>
      {rows}
      <tr>{footer}</tr>
    </table>
  );
};
