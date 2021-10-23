export default class GHManager {
  constructor(secret) {
    this.url = "https://api.github.com";
    if (!secret) throw new Error("No argument provided");

    this.secret = secret;
    this.getOptions = {
      headers: {
        Authorization: `token ${this.secret}`,
      },
    };

    this.patchHeaders = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${this.secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  async verifyToken() {
    const data = await fetch(`${this.url}/user`, this.getOptions);

    if (data.status === 401) {
      throw new Error("Invalid token");
    }
  }

  async getUserInfo(username) {
    if (username) {
      const data = await fetch(
        `${this.url}/users/${username}`,
        this.getOptions
      );
      return data.json();
    } else {
      throw new Error("No username provided");
    }
  }

  async getUserRepos(username) {
    if (username) {
      const data = await fetch(
        `${this.url}/users/${username}/repos`,
        this.getOptions
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
        this.getOptions
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
        this.getOptions
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
        headers: this.patchHeaders,
        method: "PATCH",
      });
    } else {
      throw new Error("No bio provided");
    }
  }

  async toggleHireableStatus() {
    const status = await this._getCurrProfile();
    let data;
    if (status.hireable === true) {
      data = {
        hireable: null,
      };
    } else {
      data = {
        hireable: true,
      };
    }

    return fetch(`${this.url}/user`, {
      body: JSON.stringify(data),
      headers: this.patchHeaders,
      method: "PATCH",
    });
  }

  _getCurrProfile() {
    return fetch(`${this.url}/user`, this.getOptions).then((resp) =>
      resp.json()
    );
  }
}
