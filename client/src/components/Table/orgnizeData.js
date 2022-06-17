export const orgnizeData = (arr, headers) => {
  const rows = arr.map((elem) => {
    const row = [];
    headers.map((header) => row.push(elem[header]));
    return row;
  });
  console.log(rows);
  return {
    rows: rows,
  };
};
