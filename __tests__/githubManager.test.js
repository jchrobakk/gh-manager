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

describe("getRepoInfo()", () => {
  it("should return info about repo", async () => {
    const gh = new GHManager(secret);
    const username = "jchrobakk";
    const repoName = "practice-js-testing";

    const result = await gh.getRepoInfo(username, repoName);

    expect(result).toMatchObject({ name: repoName });
  });

  it("should throw when no username or no repo name is provided", async () => {
    const gh = new GHManager(secret);

    try {
      const result = await gh.getRepoInfo();
    } catch (e) {
      expect(e.message).toBe("No username or repo name provided");
    }
  });

  it("should return 'Not found' when user or repo does not exist", async () => {
    const gh = new GHManager(secret);

    const username = "thisusernamedoesntexistloremipsum";
    const repoName = "thisreponamedoesnotexistooloremipsum";

    const result = await gh.getRepoInfo(username, repoName);

    expect(result.message).toBe("Not Found");
  });
});

describe("getRepoIssues()", () => {
  it("should return repo issues list", async () => {
    const gh = new GHManager(secret);

    const username = "facebook";
    const repoName = "react";

    const result = await gh.getRepoIssues(username, repoName);

    expect(Array.isArray(result)).toBe(true);
  });

  it("should throw when no username or no repo name is provided", async () => {
    const gh = new GHManager(secret);

    try {
      const result = await gh.getRepoIssues();
    } catch (e) {
      expect(e.message).toBe("No username or repo name provided");
    }
  });

  it("should return 'Not found' when user or repo does not exist", async () => {
    const gh = new GHManager(secret);

    const username = "thisusernamedoesntexistloremipsum";
    const repoName = "thisreponamedoesnotexistooloremipsum";

    const result = await gh.getRepoIssues(username, repoName);

    expect(result.message).toBe("Not Found");
  });
});

describe("setBio()", () => {
  it("should change profile bio", async () => {
    const ghm = new GHManager(secret);

    const newBio = "GHM test11";
    const username = "jchrobakk";

    await ghm.setBio(newBio);

    const profileInfo = await ghm.getUserInfo(username);

    expect(profileInfo.bio).toBe(newBio);
  });

  it("should throw when no bio provided", async () => {
    const gh = new GHManager(secret);

    try {
      await gh.setBio();
    } catch (e) {
      expect(e.message).toBe("No bio provided");
    }
  });
});

describe("toggleHireableStatus()", () => {
  it("should change hireable status", async () => {
    const ghm = new GHManager(secret);

    const currInfo = await ghm._getCurrProfile();

    await ghm.toggleHireableStatus();

    const newInfo = await ghm._getCurrProfile();

    if (currInfo.hireable === true) {
      expect(newInfo.hireable).toBe(null);
    } else {
      expect(newInfo.hireable).toBe(true);
    }
  });
});
