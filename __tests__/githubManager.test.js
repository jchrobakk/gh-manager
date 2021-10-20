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

describe("getUserInfo()", () => {
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

  it("should throw when no argument is provided", async () => {
    expect.assertions(1);
    const gh = new GHManager(secret);
    try {
      const result = await gh.getUserInfo();
    } catch (e) {
      expect(e.message).toBe("No username provided");
    }
  });
});

describe("getUserRepos()", () => {
  it("should return repos list", async () => {
    const gh = new GHManager(secret);
    const info = await gh.getUserRepos("jchrobakk");

    expect(Array.isArray(info)).toBe(true);
  });

  it("should throw when no argument is provided", async () => {
    expect.assertions(1);
    const gh = new GHManager(secret);
    try {
      const result = await gh.getUserRepos();
    } catch (e) {
      expect(e.message).toBe("No username provided");
    }
  });

  it("should return 'Not found' when user doesnt exist", async () => {
    const gh = new GHManager(secret);

    const username = "thisusernamedoesntexistloremipsum";

    const result = await gh.getUserRepos(username);

    expect(result.message).toBe("Not Found");
  });
});
