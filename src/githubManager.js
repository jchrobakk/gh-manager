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
    } else {
      this.secret = secret;
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
}
