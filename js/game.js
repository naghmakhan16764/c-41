class Game {
  constructor() {}
  getState() {
    db.ref("gameState").on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    db.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await db.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }
    car1 = createSprite(200, 200);
    car2 = createSprite(400, 200);
    car3 = createSprite(600, 200);
    car4 = createSprite(800, 200);

    car1.addImage("images/car1.png", car1Img);
    car2.addImage("images/car2.png", car2Img);
    car3.addImage("images/car3.png", car3Img);
    car4.addImage("images/car4.png", car4Img);

    cars = [car1, car2, car3, car4];
  }
  play() {
    form.hide();
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if (allPlayers !== undefined) {
      background(groundImg);
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      var index = 0;
      var x = 175;
      var y = 0;

      for (var plr in allPlayers) {
        index = index + 1;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        if (index === player.index) {
          fill("red");
          triangle(x, y, x - 50, y + 50, x + 50, y + 50);
          camera.position.x = displayWidth / 2;
          camera.position.y = y;
        }
        // displayPosition+=20
        // text(allPlayers[plr].name+":"+allPlayers[plr].distance,100,displayPosition)
      }
      drawSprites();
      if (keyIsDown(UP_ARROW) && player.index !== null) {
        player.distance = player.distance + 50;
        player.update();
      }
    }
    if (player.distance > displayHeight * 5) {
      console.log("high")
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }
  }
  end() {
    console.log("gameEnded");
    console.log("playerRank: " + player.rank);
  }
}
