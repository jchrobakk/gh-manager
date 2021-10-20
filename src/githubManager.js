export default class GHManager {
  constructor(secret) {
    this.url = "https://api.github.com";
    if (!secret) throw new Error("No argument provided");

    this.secret = secret;
  }

  async verifyToken() {
    const data = await fetch(`${this.url}/user`, {
      headers: {
        Authorization: `token ${this.secret}`,
      },
    });

    if (data.status === 401) {
      throw new Error("Invalid token");
    } else {
      this.secret = secret;
    }
  }

  async getUserInfo(username) {
    const data = await fetch(`${this.url}/users/${username}`, {
      headers: {
        Authorization: `token ${this.secret}`,
      },
    });
    return data.json();
  }

  async getUserRepos(username) {
    const data = await fetch(`${this.url}/users/${username}/repos`, {
      headers: {
        Authorization: `token ${this.secret}`,
      },
    });
    return data.json();
  }
}
