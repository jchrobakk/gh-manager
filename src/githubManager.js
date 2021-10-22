export default class GHManager {
  constructor(secret) {
    this.url = "https://api.github.com";
    if (!secret) throw new Error("No argument provided");

    this.secret = secret;
    this.options = {
      headers: {
        Authorization: `token ${this.secret}`,
      },
    };
  }

  async verifyToken() {
    const data = await fetch(`${this.url}/user`, this.options);

    if (data.status === 401) {
      throw new Error("Invalid token");
    }
  }

  async getUserInfo(username) {
    if (username) {
      const data = await fetch(`${this.url}/users/${username}`, this.options);
      return data.json();
    } else {
      throw new Error("No username provided");
    }
  }

  async getUserRepos(username) {
    if (username) {
      const data = await fetch(
        `${this.url}/users/${username}/repos`,
        this.options
      );
      return data.json();
    } else {
      throw new Error("No username provided");
    }
  }

  async getRepoInfo(username, repoName) {
    if (username && repoName) {
      const data = await fetch(
        `${this.url}/repos/${username}/${repoName}`,
        this.options
      );
      return data.json();
    } else {
      throw new Error("No username or repo name provided");
    }
  }

  async getRepoIssues(username, repoName) {
    if (username && repoName) {
      const data = await fetch(
        `${this.url}/repos/${username}/${repoName}/issues`,
        this.options
      );
      return data.json();
    } else {
      throw new Error("No username or repo name provided");
    }
  }

  setBio(bio) {
    if (bio) {
      const data = {
        bio: bio,
      };
      return fetch(`${this.url}/user`, {
        body: JSON.stringify(data),
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${this.secret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "PATCH",
      });
    } else {
      throw new Error("No bio provided");
    }
  }
}
