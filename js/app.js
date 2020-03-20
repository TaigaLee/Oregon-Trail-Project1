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
  money: 50,
  food: 200,
  days: 0,
  distance: 0,
  health: 100,
  ammunition: 1,
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
    $message.css("padding", "20px");
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
      `You currently have $${this.money}, your health points are at ${this.health}, and your wagon has ${this.wagon.health} health points. You will have to reach Oregon before winter arrives, or else you are doomed. Are you ready to begin? You will start walking.`
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
      game.starveCondition();
    }, 1000);
    setInterval(function() {
      game.hunt();
    }, 80000);
  },
  statsChanger: function(speed) {
    let distance = this.distance;
    let food = this.food;
    if (this.speed === "Running" && this.food > 0) {
      this.food = food - 0.8;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.3;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(1)} miles`
      );
    } else if (this.speed === "Walking" && this.food > 0) {
      this.food = food - 0.6;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.2;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(1)} miles`
      );
    } else if (this.speed === "Strolling" && this.food > 0) {
      this.food = food - 0.5;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.1;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(1)} miles`
      );
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
    } else if (this.speed === "Stopped" && this.food > 0 && this.health < 99) {
      this.food = food - 0.3;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance;
      $("#distance").text(
        `Distance Travelled: ${this.distance.toFixed(1)} miles`
      );
      this.health = health + 1;
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
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
      const $interactionDiv = $(".boxInfo");
      $(".game-screen").hide();
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
    } else if (num === 2) {
      const $riverDiv = $(".riverInfo");
      const $riverButtons = $(".riverButtons");
      $(".game-screen").hide();
      const $riverInteraction1 = $(
        "<h1 id='riverStatement'>There's a river up ahead. What would you like to do? </h1>"
      );
      $riverDiv.append($riverInteraction1);
      $riverDiv.append(
        $(
          "<img id='riverImage' src='https://format-magazine-production-res.cloudinary.com/image/upload/c_crop,h_388,w_465,x_154,y_0,f_jpg,f_auto/dpr_3.0/c_scale,w_767,h_639/A-River-Crossing-on-The-Oregon-Trail'>"
        )
      );
      $riverButtons.append(
        $(
          "<button id=longRoute>Take the long route (adds on 2 additional days)</button>"
        )
      );
      $riverButtons.append(
        $("<button id=cross>Cross the river with your wagon</button>")
      );
      $riverButtons.append(
        $(
          "<button id=waitADay>Wait one day to see if the current dies down</button>"
        )
      );
    }
  },
  interactionOptionsBox: function(option) {
    let random = Math.floor(Math.random() * 2);
    clearInterval(this.playerTimer);
    function removeStuff() {
      $("#empty-crate").remove();
      $("#boxquestion").remove();
      $("#boxstatement").remove();
      $(".boxButtons").remove();
    }
    if (option === "box") {
      if (random === 0) {
        removeStuff();
        const $badStatus = $(
          "<h2>The crate contained a hoard of wasps. You managed to escape, but at the expense of getting stung quite a few times.</h2>"
        );
        $(".boxInfo").append($badStatus);
        $(".boxInfo").append(
          $(
            "<img id='wasp' src='https://i.pinimg.com/originals/5c/31/e5/5c31e5a18cd365132db3c2dfa6164df7.jpg'>"
          )
        );
        $(".boxInfo").append($("<button class='boxOk'>Ok</button>"));
        this.health -= 40;
        this.saveStats();
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
        $(".boxInfo").append($("<button class='boxOk'>Ok</button>"));
        this.food += 30;
        this.saveStats();
      }
    } else if (option === "noBox") {
      removeStuff();
      const $interactionDiv = $(".boxInfo");
      const $interaction1Image = $(
        "<img id='empty-crate' src='https://media.istockphoto.com/vectors/wooden-box-vector-id525222158?k=6&m=525222158&s=612x612&w=0&h=j15ZHXP7Y-9VSLkcto5On4CgClEhZb-8Eq1QyWDKDY8='>"
      );
      $interactionDiv.append(
        "<h1>You decided to leave the crate alone and proceed on. </h1>"
      );
      $interactionDiv.append($interaction1Image);
      $(".boxInfo").append($("<button class='boxOk'>Ok</button>"));
    }
  },
  interactionOptionsRiver: function(answer) {
    clearInterval(this.playerTimer);
    $("#riverStatement").remove();
    $("#cross").remove();
    $("#longRoute").remove();
    $("#waitADay").remove();
    if (answer === "cross") {
      $(".riverInfo").prepend(
        $(
          "<h1>You decided to cross the river right away. A lot of your food got wet and is no longer consumable.</h1>"
        )
      );
      $("#riverImage").attr(
        "src",
        "https://cdn.vox-cdn.com/thumbor/oeNqqFIQsU_9Sfl1zhX4kSkJSGc=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/3378444/Screen_Shot_2015-02-02_at_2.51.49_PM.0.png"
      );
      $(".riverButtons").append($("<button class='riverOk'>Ok</button>"));
      this.food -= 50;
      this.saveStats();
    } else if (answer === "wait") {
      $(".riverInfo").prepend(
        $(
          "<h1>You decided to wait a day. The river calms down and you cross without any damage, but the hot sun causes you to have heat exhaustion.</h1>"
        )
      );
      $("#riverImage").attr(
        "src",
        "https://i.ytimg.com/vi/MrgAD6V_V0A/hqdefault.jpg"
      );
      $("#riverImage").attr("id", "crossingRiver");
      this.days++;
      this.food -= 20;
      this.health -= 35;
      this.saveStats();
      $(".riverButtons").append($("<button class='riverOk'>Ok</button>"));
    } else if (answer === "longRoute") {
      $(".riverInfo").prepend(
        $(
          "<h1>You decided to take the long way. You've lost two days, but didn't lose any extra health or food.</h1>"
        )
      );
      $("#riverImage").attr("src", "https://i.imgur.com/2LIivqw.png");
      this.days += 2;
      this.food -= 40;
      this.health -= 10;
      this.saveStats();
      $(".riverButtons").append($("<button class='riverOk'>Ok</button>"));
    }
  },
  starveCondition: function() {
    if (this.food === 0) {
      $(".message-box").text(
        "You're starving! Your health will drop now unless you can find some food."
      );
      this.health -= 5;
      this.saveStats();
    }
  },
  deathConditions: function() {
    if (this.health <= 0) {
      console.log("YOU'RE DEAD");
    }
  },
  resumeGame: function() {
    $(".game-screen").show();
  },
  saveStats: function() {
    const days = this.days;
    const health = this.health;
    const food = this.food;
    const distance = this.distance;
    $("#health").text(`Health: ${this.health.toFixed(1)}`);
    $("#food").text(`Food: ${this.food.toFixed(1)}`);
    $("#distance").text(`Distance Travelled: ${this.distance.toFixed(1)}`);
    $("#days").text(`Day: ${this.days}`);
  },
  town: function() {
    clearInterval(this.playerTimer);
    $(".game-screen").hide();
    const $townPrompt = $(
      "<h1 id='townPrompt'>You've reached a town checkpoint. What would you like to do?</h1>"
    );
    const $townImage = $(
      "<img id='townImage' src='https://static.turbosquid.com/Preview/001324/118/QY/_Z.jpg'>"
    );
    $(".town").append($townPrompt);
    $(".town").append($townImage);
    $(".townButtons").append(
      $("<button id='moveOn'>Move on without stopping</button>")
    );
    $(".townButtons").append(
      $("<button id='goToStore'>Stop by the store to buy goods.</button>")
    );
    $(".townButtons").append(
      $("<button id='rest'>Rest a day to restore health.</button>")
    );
  },
  randomVoiceLines: function() {
    console.log("HI");
  },
  townInteractions(choice) {
    if (choice === "moveOn") {
      $(".town-interactions").hide();
      this.resumeGame();
      $(".message-box").text(
        "You decided to go past the town without stopping by."
      );

      setTimeout(fade, 4000);

      function fade() {
        $(".message-box").text("");
      }

      this.timer();
    } else if (choice === "rest") {
      $(".town-interactions").hide();
      this.resumeGame();
      $(".speed-buttons").hide();
      $(".message-box").text(
        "You spent the day in town doing odd jobs and made some money! You decided to rest in town and feel much better in the morning."
      );

      this.money += 20;
      this.health += 40;
      this.saveStats();
      setTimeout(townAgain, 3000);

      function townAgain() {
        $(".message-box").text("");
        $(".game-screen").hide();
        $(".town-interactions").show();
      }
    }
  },
  store: function() {
    let total = 0;
    let eggsBought = 0;
    let meatBought = 0;
    let ointmentBought = 0;
    let ammunitionBought = 0;
    let wagonPartsBought = 0;
    $(".town-interactions").hide();
    const $storeDiv = $(".storeDiv");
    const $itemsDiv = $(".items");
    $(".storeOwner").append(
      $("<img id='storeOwner' src='https://i.imgur.com/Th2wTxH.png'>")
    );
    $storeDiv.prepend(
      $(
        `<h3 id='storeprompt'>Welcome to my general store! You currently have $${this.money}.</br> What would you like to buy today? I have a limit of one wagon part and two for everything else.</h3>`
      )
    );
    const $eggs = $(
      "<button id='buyEggs'>Eggs: $5 each dozen (+12 food)</button>"
    );

    const $meat = $(
      "<button id='buyMeat'>Meat: $8 for a steak (+20 food) </button>"
    );

    const $ointment = $(
      "<button id='ointment'>Ointment: $6 for a bottle (+10 health) </button>"
    );

    const $ammunition = $(
      "<button id='ammunition'>Ammunition: $15 per box (Enough for one hunt) </button>"
    );

    const $wagonParts = $(
      "<button id='wagonParts'>Wagon Parts: $35 (restores your wagon to full HP) </button>"
    );

    $itemsDiv.append($eggs);
    $itemsDiv.append($meat);
    $itemsDiv.append($ointment);
    $itemsDiv.append($ammunition);
    $itemsDiv.append($wagonParts);
    $(".store-box").css("border", "2px solid white");
    $(".store-box").html(
      `<h3 id='total'>Current total: ${total}</h3><h4 id='totalEggs'>Eggs bought: ${eggsBought}</h4><h4 id='totalMeat'>Meat bought: ${meatBought}</h4><h4 id='totalOintment'>Ointment bought: ${ointmentBought}</h4><h4 id='totalAmmunition'>Ammunition bought: ${ammunitionBought}</h4><h4 id='totalWagonParts'>Wagon parts bought: ${wagonPartsBought}</h4>`
    );

    $storeDiv.append("<button id='storeOk'>Ok</button>");

    $("body").on("click", ".items", function(event) {
      if (event.target.id === "buyEggs") {
        eggsBought++;
        total += 3;
        $("#total").text(`Current total: ${total}`);
        $("#totalEggs").text(`Eggs bought: ${eggsBought}`);
      } else if (event.target.id === "buyMeat") {
        meatBought++;
        total += 8;
        $("#total").text(`Current total: ${total}`);
        $("#totalMeat").text(`Meat bought: ${meatBought}`);
      } else if (event.target.id === "ointment") {
        ointmentBought++;
        total += 6;
        $("#total").text(`Current total: ${total}`);
        $("#totalOintment").text(`Ointment bought: ${ointmentBought}`);
      } else if (event.target.id === "ammunition") {
        ammunitionBought++;
        total += 15;
        $("#total").text(`Current total: ${total}`);
        $("#totalAmmunition").text(`Ammunition bought: ${ammunitionBought}`);
      } else if (event.target.id === "wagonParts" && wagonPartsBought < 1) {
        wagonPartsBought++;
        total += 35;
        $("#total").text(`Current total: ${total}`);
        $("#totalWagonParts").text(`Wagon parts bought: ${wagonPartsBought}`);
      }
    });

    $("body").on("click", "#storeOk", function(event) {
      if (game.money >= total) {
        game.buyStuff(
          eggsBought,
          meatBought,
          ointmentBought,
          ammunitionBought,
          wagonPartsBought
        );
        game.money -= total;
        game.saveStats();
        $(".storeDiv").hide();
        $(".town-interactions").show();
      } else {
        console.log("not enough money");
      }
    });
  },
  buyStuff: function(eggs, meat, ointment, ammunition, wagonParts) {
    this.food += eggs * 12;
    this.food += meat * 20;
    this.health += ointment * 10;
    this.ammunition += ammunition + 1;
    this.wagon.health = 100;
  }
};

//event listeners

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
  game.town();
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
    game.interact(1);
  }, 50000);

  setTimeout(function() {
    game.interact(2);
  }, 2000000);

  setTimeout(function() {
    game.interact(2);
  }, 5000000);

  game.timer();
});

$("body").on("click", "#yesBox", function() {
  game.interactionOptionsBox("box");
});

$("body").on("click", "#noBox", function() {
  game.interactionOptionsBox("noBox");
});

$("body").on("click", ".boxOk", function() {
  $(".boxInfo").remove();
  $(".boxButtons").remove();
  game.resumeGame();
  game.timer();
});

$("body").on("click", "#cross", function() {
  game.interactionOptionsRiver("cross");
});

$("body").on("click", "#waitADay", function() {
  game.interactionOptionsRiver("wait");
});

$("body").on("click", "#longRoute", function() {
  game.interactionOptionsRiver("longRoute");
});

$("body").on("click", ".riverOk", function() {
  $(".riverInfo").remove();
  game.resumeGame();
  game.timer();
  setTimeout(function() {
    game.town();
  }, 90000);
});

$("body").on("click", "#moveOn", function() {
  game.townInteractions("moveOn");
});

$("body").on("click", "#rest", function() {
  game.townInteractions("rest");
});

$("body").on("click", "#goToStore", function() {
  game.store();
});
