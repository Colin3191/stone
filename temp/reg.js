let number = /[0-9]+/;
let identifier = /[a-z_A-z][a-z_A-Z0-9]*|==|<=|>=|&&|\|\|<|=|>|,/;
let string = /"(\\"|\\\\|\\n|[^"])*"/;
let pattern =
  /\s*((\/\/.*)|([0-9]+)|("(\\|\\\\|\\"|\\n|[^"])*")|([a-zA-Z_][a-zA-Z_0-9]*|==|<=|>=|&&|\|\||=|<|>))?/g;

let code = "n = 3";

let res = code.matchAll(pattern)
console.log([...res])

