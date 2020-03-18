// creates the pioneer and his family
class Pioneer {
  constructor(characterName) {
    this.characterName = characterName;
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
  health: 100,
  illness: null,
  healthStatus: "Good",
  wagon: {
    health: 100
  },
  playerTimer: 0,
  currentTime: 0,
  speed: "Stopped",
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
    $message.append("<button id='next-button'>Next</button>");
    $stats.append($dayTracker);
    $stats.append($distanceTracker);
    $stats.append($foodTracker);
    $stats.append($moneyTracker);
    $(".main-game-image").append(
      $("<img id='main-game-image' src=https://i.imgur.com/XLTUCpX.png>")
    );
    $walkButtons.append($("<button id='run-button'>Run</button>"));
    $walkButtons.append($("<button id='walk-button'>Walk</button>"));
    $walkButtons.append($("<button id='stroll-button'>Stroll</button>"));
    $walkButtons.append($("<button id='stop-button'>Stop</button>"));
    $("#next-button").on("click", function() {
      game.displayStats();
    });
  },
  displayStats: function() {
    const $message = $(".message-box");
    $message.text(
      `You currently have $${this.money}, your health points are at ${this.health}, you have no illnesses, and your wagon has ${this.wagon.health} health points. Are you ready to begin? You will start walking.`
    );
    $message.append("<button id='yesStart'>Ok</button>");
  },
  decideSpeed: function(speed) {
    const $speedTracker = $(
      "<h2 id='speed'>Current Speed: " + this.speed + "</h2>"
    );
    $(".speed-display").append($speedTracker);
    const $speedDisplay = $(".speed-display");
    if (speed === "run") {
      this.speed = "Running";
      $speedDisplay.text(`Current speed: ${this.speed}`);
    } else if (speed === "walk") {
      this.speed = "Walking";
      $speedDisplay.text(`Current speed: ${this.speed}`);
    } else if (speed === "stroll") {
      this.speed = "Strolling";
      $speedDisplay.text(`Current speed: ${this.speed}`);
    } else if (speed === "stop") {
      this.speed = "Stopped";
      $speedDisplay.text(`Current speed: ${this.speed}`);
    }
  },
  timer: function() {
    this.playerTimer = setInterval(function() {
      game.currentTime++;
      game.statsChanger();
    }, 5000);
  },
  statsChanger: function(speed) {
    let distance = this.distance;
    if (this.speed === "Running") {
      this.distance = distance + 2;
      $("#distance").text(`Distance Travelled: ${this.distance}`);
    } else if (this.speed === "Walking") {
      this.distance++;
      $("#distance").text(`Distance Travelled: ${this.distance}`);
    } else if (this.speed === "Strolling") {
      this.distance = distance + 0.5;
      $("#distance").text(`Distance Travelled: ${this.distance}`);
    } else if (this.speed === "Stopped") {
      this.distance = distance;
      $("#distance").text(`Distance Travelled: ${this.distance}`);
    }
    if (this.currentTime % 60 === 0) {
      this.days++;
      $("#days").text(`Day: ${this.days}`);
    }
  }
};

$("#start-button").on("click", function() {
  const pName = $("#name-entry-input").val();
  game.startGame(pName);
});

$("body").on("click", "#run-button", function() {
  game.decideSpeed("run");
});

$("body").on("click", "#walk-button", function() {
  game.decideSpeed("walk");
});

$("body").on("click", "#stroll-button", function() {
  game.decideSpeed("stroll");
});

$("body").on("click", "#stop-button", function() {
  game.decideSpeed("stop");
});

$("body").on("click", "#yesStart", function() {
  game.decideSpeed("walk");
  $("#yesStart").remove();
  $(".message-box").text("Off you go!");
  setTimeout(fade, 3000);
  function fade() {
    $(".message-box").text("");
  }

  game.timer();
});
