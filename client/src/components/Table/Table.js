import "./Table.css";

export const Table = (props) => {
  const headers = props.headers.map((header) => <th>{header}</th>);
  const rows = props.rows.map((row) => (
    <tr>
      {row.map((cell) => (
        <td>{cell}</td>
      ))}
    </tr>
  ));
  //   const footer = props.footer.map((cell) => <td>{cell}</td>);

  return (
    <table className="Table">
      <tr>{headers}</tr>
      {rows}
      {/*       <tfoot>{footer}</tfoot>
       */}
    </table>
  );
};
