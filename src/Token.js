export class Token {
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

export class NumberToken extends Token {
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

export class IdentifierToken extends Token {
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

export class StringToken extends Token {
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
