
export default class ghManager {
  constructor(secret = null) {
    this.isLogged = secret === null ? false : true;
    this.url = "https://api.github.com";

    this.nick = null; // tutaj moze byc zapisany login usera
  }

  getUserProfileInfo(nick = null) {
    let currentNick = nick;
    if(currentNick === null && this.isLogged) {
      currentNick = this.nick;
    }

    return fetch(`${this.url}/users/${currentNick}`)
      .then((response) => response.json())
      // .then((data) => data)
      .catch((e) => {
        throw new Error(e.message);
      });
  }
}

// const ghm = new ghManager();
// const info = ghm.getUserProfileInfo("jchrobakk");
// console.log(info);
