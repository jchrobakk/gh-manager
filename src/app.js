import ghManager from "./githubManager";

const ghm = new ghManager();
const info = ghm.getUserProfileInfo("jchrobakk");
console.log(info);