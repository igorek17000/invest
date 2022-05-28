export const print = (desc = "", value = "") => console.log(desc, value);

export const printDebug = (desc = "", value = "") =>
  console.log(
    `
""""""""""""""""""""""""""""""""""""""
"""""""""""""${desc}"""""""""""""""""
"""""""""""""""""""""""""""""""""""""`,
    value
  );
