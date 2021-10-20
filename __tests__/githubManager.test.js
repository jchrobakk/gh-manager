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
    const gh = new GHManager("dwqdwq");
    const result = await gh.verifyToken();

    await expect(result.message).toBe("Invalid token");
  });
});
