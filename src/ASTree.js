class ASTree {
  children;
  location;
}

class ASTLeaf extends ASTree {
  token;
  constructor(t) {
    this.token = t;
  }
  toString() {
    return this.token.getText();
  }
  location() {
    return "at line" + this.token.getLineNumber();
  }
}

class ASTList extends ASTree {
  constructor(list) {
    this.children = list;
  }
  toString() {
    let str = "(";
    let sep = "";
    for (const child of this.children) {
      str += sep;
      sep = " ";
      str += child.toString();
    }
    str += ")";
    return str;
  }
  location() {
    for (const child of children) {
      const s = child.location();
      if (s) {
        return s;
      }
    }
    return null;
  }
}

class NumberLiteral extends ASTLeaf {
  constructor(t) {
    super(t);
  }
  value() {
    this.token.getNumber();
  }
}

class Name extends ASTLeaf {
  constructor(t) {
    super(t);
  }
  name() {
    return this.token.getText();
  }
}

class BinaryExpr extends ASTList {
  constructor(c) {
    super(c);
  }
  left() {
    return this.children[0];
  }
  operator() {
    return this.children[1].token.getText();
  }
  right() {
    return this.children[2];
  }
}
