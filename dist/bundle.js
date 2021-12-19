class Token {
  /**end of file */
  static EOF = new Token(-1);
  /**end of line */
  static EOL = "\n";
  line;
  constructor(line) {
    this.line = line;
  }
  getLineNumber() {
    return this.line;
  }
  isIdentifier() {
    return false;
  }
  isNumber() {
    return false;
  }
  isString() {
    return false;
  }
  getNumber() {
    throw Error("not number token");
  }
  getText() {
    return "";
  }
}

class NumberToken extends Token {
  value;
  constructor(line, val) {
    super(line);
    this.value = val;
  }
  isNumber() {
    return true;
  }
  getText() {
    return this.value.toString();
  }
  getNumber() {
    return this.value;
  }
}

class IdentifierToken extends Token {
  text;
  constructor(line, id) {
    super(line);
    this.text = id;
  }
  isIdentifier() {
    return true;
  }
  getText() {
    return this.text();
  }
}

class StringToken extends Token {
  literal;
  constructor(line, str) {
    super(line);
    this.literal = str;
  }
  isString() {
    return true;
  }
  getText() {
    return this.literal();
  }
}

const readLine = require("readline");
const fs = require("fs");
class Lexer {
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

let lexer = new Lexer("test.txt");


lexer.readLine.on('close',() => {
  console.log(lexer.queue);
});
