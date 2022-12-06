import deploy from "./deploy.js";
const myArgs = process.argv.slice(2);
console.log(myArgs[0]);
deploy(myArgs[0]);