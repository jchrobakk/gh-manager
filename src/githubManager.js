export default class GHManager {
  constructor(secret) {
    this.url = "api.github.com";
    if (!secret) throw new Error("No argument provided");
    this.verifyToken(secret);
  }

  async verifyToken(secret) {
    try {
      const data = await fetch(`${this.url}/user`);
      if (data.status === 401) {
        throw new Error();
      } else {
        this.secret = secret;
      }
    } catch (e) {
      throw new Error("Invalid token");
    }
  }
}
