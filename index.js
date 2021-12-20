import { Lexer } from "./src/Lexer";

let lexer = new Lexer("test.txt");

lexer.readLine.on("close", () => {
  console.log(lexer.queue)
});
