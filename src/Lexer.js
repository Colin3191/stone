import { NumberToken, StringToken, IdentifierToken, Token } from "./Token";
const readLine = require("readline");
const fs = require("fs");
export class Lexer {
  static pattern =
    /\s*((\/\/.*)|([0-9]+)|("(\\|\\\\|\\"|\\n|[^"])*")|([a-zA-Z_][a-zA-Z_0-9]*|==|<=|>=|&&|\|\||=|<|>))?/g;
  queue = [];
  hasMore;
  readLine;
  lineNumber = 0;
  constructor(path) {
    this.hasMore = true;
    this.readLine = readLine.createInterface({
      input: fs.createReadStream(path),
      output: process.stdout,
      terminal: false,
    });
    this.readLine.on("line", (line) => {
      console.log(line);
      const lineNumber = this.lineNumber;
      const groups = [...line.matchAll(Lexer.pattern)];
      if (groups[0] !== "") {
        this.addToken(lineNumber, groups);
      } else {
        throw Error("bad token at line" + lineNumber);
      }
      this.queue.push(new IdentifierToken(lineNumber, Token.EOL));
      this.lineNumber++;
    });
  }

  addToken(lineNumber, groups) {
    //if not a space
    for (const group of groups) {
      if (group[1] !== undefined) {
        // if not a comment
        if (group[2] === undefined) {
          let token;
          if (group[3] !== undefined) {
            //number token
            token = new NumberToken(lineNumber, group[3]);
          } else if (group[4] !== undefined) {
            //string token
            token = new StringToken(lineNumber, group[4]);
          } else if (group[6] !== undefined) {
            //identifier token
            token = new IdentifierToken(lineNumber, group[6]);
          }
          this.queue.push(token);
        }
      }
    }
  }
}
