import fetch from "node-fetch";
global.fetch = fetch;

import ghManager from "../src/githubManager";

describe("setup", () => {
  it("should return isLogged false when no argument given", () => {
    const ghm = new ghManager();

    expect(ghm.isLogged).toBe(false);
  });
});

describe("non authentication functions", () => {
  it("should return profile information", async () => {
    expect.assertions(1);

    const ghm = new ghManager();
    const pattern = require("./patterns/user.json");
    // console.log(pattern);
    try {
      const profileInfo = await ghm.getUserProfileInfo("jchrobakk");
    } catch(e) {
      expect(profileInfo).toMatchObject({login: 'jchrobakk'});
    }
    // console.log(profileInfo);
    // const result = compareKeys(pattern, profileInfo);

    
  });
});

function compareKeys(a, b) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
