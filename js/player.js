class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
  }

  updateCount(playerCount) {
    db.ref("/").update({
      playerCount: playerCount,
    });
  }

  getCount() {
    db.ref("playerCount").on("value",  (data) => {
      playerCount = data.val();
    });
  }
  getCarsAtEnd() {
    db.ref("carsAtEnd").on("value",  (data) => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    db.ref("/").update({
      carsAtEnd: rank,
    });
  }

  update() {
    var playerIndex = "players/player" + player.index;
    db.ref(playerIndex).set({
      name: this.name,
      distance: this.distance,
    });
  }

  static getPlayerInfo() {
    db.ref("players").on("value", (data) => {
      allPlayers = data.val();
    });
  }
}
