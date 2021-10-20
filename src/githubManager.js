export default class GHManager {
  constructor(secret) {
    this.url = "api.github.com";
    if (!secret) throw new Error("No argument provided");
  }

  async verifyToken(secret) {
    try {
      const data = await fetch(`${this.url}/user`);
      console.log(data);
      if (data.status === 401) {
        throw new Error();
      } else {
        this.secret = secret;
      }
    } catch (e) {
      return new Error("Invalid token");
    }
  }
}
