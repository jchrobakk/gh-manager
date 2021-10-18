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
    function setup() {
      new GHManager("dwqwqd");
    }

    expect(setup).toThrow("Invalid token");
  });
});
