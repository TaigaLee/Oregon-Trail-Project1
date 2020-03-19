// creates the pioneer
class Pioneer {
  constructor(characterName) {
    this.characterName = characterName;
  }
}

// class AnimalToHunt {
//   this.value
// }

// game object

const game = {
  money: 100,
  food: 200,
  days: 0,
  distance: 0,
  health: 100,
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
    const $dayTracker = $("<h2 id='days'>Day: " + this.days + "</h2>");
    const $foodTracker = $("<h2 id='food'>Food: " + this.food + "</h2>");
    const $moneyTracker = $("<h2 id='money'>Money: " + this.money + "</h2>");
    const $distanceTracker = $(
      "<h2 id='distance'>Distance Travelled: " + this.distance + "</h2>"
    );
    const $healthTracker = $(
      "<h2 id='health'>Status: " + this.healthStatus + "</h2>"
    );
    const $hpTracker = $("<h2 id='hp'>Health: " + this.health + "</h2>");
    const $message = $(".message-box");
    $message.css("width", "500px");
    $message.css("height", "200px");
    $message.css("border", "2px solid white");
    $message.css("margin", "30px auto");
    $message.text(
      `Hello ${player.characterName}! You're about to embark on a journey through the Oregon Trail.`
    );
    $message.append("<button id='next-button'>Next</button>");
    $stats.append($dayTracker);
    $stats.append($distanceTracker);
    $stats.append($foodTracker);
    $stats.append($hpTracker);
    $stats.append($healthTracker);
    $stats.append($moneyTracker);
    $(".main-game-image").append(
      $("<img id='main-game-image' src=https://i.imgur.com/XLTUCpX.png>")
    );
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
      game.statsDecrease();
    }, 1000);
    setInterval(function() {
      console.log(game.currentTime);
      game.hunt();
    }, 80000);
  },
  statsChanger: function(speed) {
    let distance = this.distance;
    let food = this.food;
    let health = this.health;
    if (this.speed === "Running") {
      this.food = food - 0.8;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.3;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(2)} miles`
      );
      this.health = health - 0.5;
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
    } else if (this.speed === "Walking") {
      this.food = food - 0.6;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.2;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(2)} miles`
      );
      this.health = health - 0.3;
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
    } else if (this.speed === "Strolling") {
      this.food = food - 0.5;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.1;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(2)} miles`
      );
      this.health = health - 0.2;
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
    } else if (this.speed === "Stopped") {
      this.food = food - 0.3;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(2)} miles`
      );
      if (this.health < 99) {
        this.health = health + 1;
        $("#hp").text(`HP: ${this.health.toFixed(1)}`);
      }
    }
  },
  statsDecrease: function() {
    let food = this.food;
    if (this.currentTime % 60 === 0) {
      this.days++;
      $("#days").text(`Day: ${this.days}`);
    }
    if (this.health <= 80 && this.health >= 40) {
      this.healthStatus = "Decent";
      $("#health").text(`Health: ${this.healthStatus}`);
    } else if (this.health < 40 && this.health >= 20) {
      this.healthStatus = "Bad";
      $("#health").text(`Health: ${this.healthStatus}`);
    } else if (this.health < 20 && this.health > 5) {
      this.healthStatus = "About to die";
      $("#health").text(`Health: ${this.healthStatus}`);
    } else if (this.health === 0) {
      this.healthStatus = "Dead";
      $("#health").text(`Health: ${this.healthStatus}`);
    }
  },
  hunt: function() {
    console.log("placeholder");
  },
  interact: function(num) {
    if (num === 1) {
      $(".game-screen").hide();
      const $interactionDiv = $(".boxInfo");
      const $interaction1 = $(
        "<h1 id='boxstatement'>You've found a crate on the side of the road!</h1>"
      );
      const $interaction1Quest = $(
        "<h2 id='boxquestion'>Would you like to open it at your own risk?</h2>"
      );
      const $interaction1Image = $(
        "<img id='empty-crate' src='https://media.istockphoto.com/vectors/wooden-box-vector-id525222158?k=6&m=525222158&s=612x612&w=0&h=j15ZHXP7Y-9VSLkcto5On4CgClEhZb-8Eq1QyWDKDY8='>"
      );
      const $yesButton = $("<button id='yesBox'>Yes</button>");
      const $noButton = $("<button id='noBox'>No</button>");
      $interactionDiv.append($interaction1);
      $interactionDiv.append($interaction1Quest);
      $interactionDiv.append($interaction1Image);
      $(".boxButtons").append($yesButton);
      $(".boxButtons").append($noButton);
    }
  },
  interactionOptions: function(option) {
    let random = Math.floor(Math.random() * 2);
    function pauseGame() {
      // const health = this.health;
    }
    function removeStuff() {
      $("#empty-crate").remove();
      $("#boxquestion").remove();
      $("#boxstatement").remove();
      $(".boxButtons").remove();
    }
    if (option === "box") {
      if (random === 0) {
        removeStuff();
        this.health = this.health - 40;
        const $badStatus = $(
          "<h2>The crate contained a hoard of wasps. You managed to escape, but at the expense of getting stung quite a few times.</h2>"
        );
        $(".boxInfo").append($badStatus);
        $(".boxInfo").append(
          $(
            "<img id='wasp' src='https://i.pinimg.com/originals/5c/31/e5/5c31e5a18cd365132db3c2dfa6164df7.jpg'>"
          )
        );
        $(".boxInfo").append($("<button id='boxOk'>Ok</button>"));
      } else {
        removeStuff();
        const $goodStatus = $(
          "<h2>The crate contained a bunch of food! It must've dropped off of someone else's wagon, but it's yours now!</h2>"
        );
        $(".boxInfo").append($goodStatus);
        $(".boxInfo").append(
          $(
            "<img id='box-food' src='https://media.istockphoto.com/vectors/wooden-crate-with-vegetables-and-fruits-healthy-lifestyle-vector-id872797682?k=6&m=872797682&s=612x612&w=0&h=RBRmFOCRloSF16rWowwavFnAZuCi361PIjGtShH3zpw='>"
          )
        );
        $(".boxInfo").append($("<button id='boxOk'>Ok</button>"));
        this.food = this.food + 25;
      }
    }
  },
  starvingAndIllness: function() {
    console.log("placeholder");
  },
  deathConditions: function() {
    if (this.health <= 0) {
      console.log("YOU'RE DEAD");
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
  const $walkButtons = $(".speed-buttons");
  setTimeout(makeButtons, 2500);
  function makeButtons() {
    $walkButtons.append($("<button id='run-button'>Run</button>"));
    $walkButtons.append($("<button id='walk-button'>Walk</button>"));
    $walkButtons.append($("<button id='stroll-button'>Stroll</button>"));
    $walkButtons.append($("<button id='stop-button'>Rest</button>"));
  }
  setTimeout(function() {
    let random = Math.floor(Math.random() * 3) + 1;
    game.interact(1);
  }, 5000);
  game.timer();
});

$("body").on("click", ".boxButtons", function() {
  game.interactionOptions("box");
});
