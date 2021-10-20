import fetch from "node-fetch";
global.fetch = fetch;
require("dotenv").config();
const secret = process.env.SECRET;

import GHManager from "../src/githubManager";

describe("setup", () => {
  it("should throw when no argument provided", () => {
    function setup() {
      new GHManager();
    }
    expect(setup).toThrow("No argument provided");
  });
  it("should throw when token is invalid", async () => {
    const gh = new GHManager("ddd");

    await expect(gh.verifyToken()).rejects.toThrow("Invalid token");
  });
});

describe("user informations", () => {
  it("should return profile info", async () => {
    const gh = new GHManager(secret);

    const username = "jchrobakk";
    const info = await gh.getUserInfo(username);

    expect(info).toMatchObject({ login: username });
  });

  it("should return 'Not found' when user doesnt exist", async () => {
    const gh = new GHManager(secret);

    const username = "thisusernamedoesntexistloremipsum";

    const result = await gh.getUserInfo(username);

    expect(result.message).toBe("Not Found");
  });
});
