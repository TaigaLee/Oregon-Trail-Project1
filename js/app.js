// creates the pioneer and his family
class Pioneer {
  constructor(characterName) {
    this.characterName = characterName;
    this.health = 100;
    this.illness = null;
    this.healthStatus = "Excellent";
  }

  // getName() {
  //   const playerName = $("#name-entry-input").value;
  // }
}

// game object

const game = {
  money: 500,
  food: 200,
  days: 0,
  distance: 0,
  wagon: {
    health: 100
  },
  startGame: function(pName) {
    const player = new Pioneer(pName);
    $(".welcome-screen").remove();
    const $gameScreen = $(".game-screen");
    const $stats = $(".stats-bar");
    const $walkButtons = $(".speed-buttons");
    const $dayTracker = $("<h2 id='days'>Day: " + this.days + "</h2>");
    const $foodTracker = $("<h2 id='food'>Food: " + this.food + "</h2>");
    const $moneyTracker = $("<h2 id='money'>Money: " + this.money + "</h2>");
    const $distanceTracker = $(
      "<h2 id='distance'>Distance Travelled: " + this.distance + "</h2>"
    );
    const $message = $(".message-box");
    $message.css("width", "500px");
    $message.css("height", "200px");
    $message.css("border", "2px solid black");
    $message.css("margin", "30px auto");
    $message.text(
      `Hello ${player.characterName}! You're about to embark on a journey through the Oregon Trail.`
    );
    console.log(player.characterName);
    $stats.append($dayTracker);
    $stats.append($distanceTracker);
    $stats.append($foodTracker);
    $stats.append($moneyTracker);
    $(".main-game-image").append(
      $("<img id='main-game-image' src=https://i.imgur.com/XLTUCpX.png>")
    );
    // $(".message-box").append()
    $walkButtons.append($("<button id='run-button'>Run</button>"));
    $walkButtons.append($("<button id='walk-button'>Walk</button>"));
    $walkButtons.append($("<button id='stroll-button'>Stroll</button>"));
    $walkButtons.append($("<button id='stop-button'>Stop</button>"));
  }
};

$("#start-button").on("click", function() {
  const pName = $("#name-entry-input").val();
  game.startGame(pName);
});
