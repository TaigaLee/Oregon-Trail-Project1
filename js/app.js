// creates the pioneer
class Pioneer {
  constructor(characterName) {
    this.characterName = characterName;
  }
}

// music

const mainMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/grhaiqgy/001%20Title%20Theme.mp3"
);
mainMusic.loop = true;

const oxMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/hulgofoq/006%20Trail%201%20Good.mp3"
);
oxMusic.loop = true;

const boxMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/khhmlora/005%20Kanesville%2C%20Council%20Bluffs.mp3"
);
boxMusic.loop = true;

const beesMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/wnynpdgq/021%20Trail%202%20Poor.mp3"
);
beesMusic.loop = true;

const goodBoxMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/ujapimen/032%20Trail%203%20Good.mp3"
);

goodBoxMusic.loop = true;

const riverMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/eitlrgms/022%20Down%20In%20The%20Valley.mp3"
);

riverMusic.loop = true;

const townMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/ybnhyccg/009%20Go%20Tell%20Aunt%20Rhody%20%28Town%29.mp3"
);

townMusic.loop = true;

const storeMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/ferblmzs/013%20Jimmy%20Crack%20Corn%20%28Fort%29.mp3"
);
storeMusic.loop = true;

const huntMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/iasxwiwx/055%20Buffalo%20Gals%20%28Town%29.mp3"
);
huntMusic.loop = true;

const winMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/ilsubhrx/064%20You%27ve%20Reached%20Your%20Destination%21.mp3"
);
winMusic.loop = true;

const loseMusic = new Audio(
  "https://vgmdownloads.com/soundtracks/oregon-trail-2-ost/pegpgqml/048%20Trail%204%20Poor.mp3"
);
loseMusic.loop = true;
// game object

const game = {
  money: 35,
  food: 100,
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
  total: 0,
  startGame: function(pName) {
    const player = new Pioneer(pName);
    $(".welcome-screen").remove();
    const $gameScreen = $(".game-screen");
    const $stats = $(".stats-bar");
    const $dayTracker = $("<h2 id='days'>Day: " + this.days + "</h2>");
    const $foodTracker = $("<h2 id='food'>Food: " + this.food + "</h2>");
    const $moneyTracker = $("<h2 id='money'>Money: $" + this.money + "</h2>");
    const $distanceTracker = $(
      "<h2 id='distance'>Distance Traveled: " + this.distance + "</h2>"
    );
    const $healthTracker = $(
      "<h2 id='healthStatus'>Wagon Status: " + this.healthStatus + "</h2>"
    );
    const $hpTracker = $("<h2 id='hp'>Health: " + this.health + "</h2>");
    const $message = $(".message-box");
    $message.css("width", "500px");
    $message.css("padding", "20px");
    $message.css("height", "150px");
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
      $(
        "<img id='main-game-image' src='https://assets.website-files.com/5661de094faab4b202ad12f2/5852de4b99affdc361f41834_bg%20anim%2036.gif'>"
      )
    );
    $(".cowswalking").append(
      $("<img id='cows' src='https://i.imgur.com/nnKCqjz.png'>")
    );
    $("#main-game-image").css("height", "350px");
    $("#next-button").on("click", function() {
      game.displayStats();
    });
  },
  displayStats: function() {
    const $message = $(".message-box");
    $message.text(
      `You currently have $${this.money}, your health points are at ${this.health}, and your wagon has ${this.wagon.health} health points. You had a late start and need to reach Oregon (75) miles) in 10 days, or else a huge winter storm approaches and you are doomed. Are you ready to begin? You will start walking.`
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
    } else if (speed === "Move very slowly") {
      this.speed = "Moving very slowly";
      $speedDisplay.text(`Current speed: ${this.speed}`);
    }
  },
  timer: function() {
    this.playerTimer = setInterval(function() {
      game.currentTime++;
      game.statsChanger();
      game.statsDecrease();
      game.starveCondition();
      game.winOrLose();
    }, 1000);
  },
  statsChanger: function(speed) {
    let distance = this.distance;
    let food = this.food;
    if (this.speed === "Running" && this.food > 0) {
      this.wagon.health -= 0.4;
      this.food = food - 0.8;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.4;
      $("#distance").text(
        `Distance Traveled: ${this.distance.toFixed(1)} miles`
      );
    } else if (this.speed === "Walking" && this.food > 0) {
      this.wagon.health -= 0.3;
      this.food = food - 0.5;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.2;
      $("#distance").text(
        `Distance Traveled: ${this.distance.toFixed(1)} miles`
      );
    } else if (this.speed === "Strolling" && this.food > 0) {
      this.wagon.health -= 0.2;
      this.food = food - 0.4;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance + 0.1;
      $("#distance").text(
        `Distance Traveled: ${this.distance.toFixed(1)} miles`
      );
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
    } else if (
      this.speed === "Moving very slowly" &&
      this.food > 0 &&
      this.health < 99
    ) {
      this.wagon.health -= 0.1;
      this.food = food - 0.3;
      $("#food").text(`Food: ${this.food.toFixed(1)}`);
      this.distance = distance;
      $("#distance").text(
        `Distance Traveled: ${this.distance.toFixed(1)} miles`
      );
      this.distance = distance + 0.2;
      $("#distance").text(
        `Distance Traveled: ${this.distance.toFixed(1)} miles`
      );
      this.health += 2;
      $("#hp").text(`HP: ${this.health.toFixed(1)}`);
    }
  },
  statsDecrease: function() {
    if (this.currentTime % 30 === 0) {
      this.days++;
      $("#days").text(`Day: ${this.days}`);
    }
    if (this.wagon.health <= 80 && this.wagon.health >= 40) {
      this.healthStatus = "Decent";
      $("#healthStatus").text(`Wagon Health: ${this.healthStatus}`);
    } else if (this.wagon.health < 40 && this.wagon.health >= 20) {
      this.healthStatus = "Bad";
      $("#healthStatus").text(`Wagon Health: ${this.healthStatus}`);
    } else if (this.wagon.health < 20 && this.wagon.health > 5) {
      this.healthStatus = "About to die";
      $("#healthStatus").text(`Wagon Health: ${this.healthStatus}`);
    } else if (this.wagon.health === 0) {
      this.healthStatus = "No longer useable";
      $("#healthStatus").text(`Wagon Health: ${this.healthStatus}`);
    }
  },
  hunt: function() {
    oxMusic.pause();
    huntMusic.play();
    $(".store-div").hide();
    $(".game-screen").hide();
    $(".hunt").prepend(
      $(
        "<h1 id='huntprompt'>I see some rabbits that I could hunt for meat! Quick, shoot them (click them) before it gets dark!</h1>"
      )
    );
    $(".hunt-image").append(
      $(
        "<img id='hunting-background' src='https://i.pinimg.com/originals/b8/cb/bd/b8cbbda2ca1be6a11391559752937172.jpg'>"
      )
    );
    $(".bunnyimg").append(
      $("<img id='bunny' src='https://i.imgur.com/Vr27Ntq.png'>")
    );

    function bunnyMovement() {
      setTimeout(moveBunny, 300);

      setTimeout(moveBunny, 500);

      setTimeout(moveBunny, 800);

      setTimeout(moveBunny, 1200);

      setTimeout(moveBunny, 1400);

      // setTimeout(moveBunny, 1600);

      setTimeout(function() {
        $(".bunnyimg").hide();
      }, 1650);

      function moveBunny() {
        $(".bunnyimg").css("left", "-=100px");
      }
    }
    bunnyMovement();

    setTimeout(resetBunny, 6000);
    setTimeout(bunnyMovement, 6100);
    setTimeout(resetBunny, 9000);
    setTimeout(bunnyMovement, 9100);
    setTimeout(resetBunny, 12000);
    setTimeout(bunnyMovement, 12100);
    setTimeout(resetBunny, 15000);
    setTimeout(bunnyMovement, 15100);

    function resetBunny() {
      $(".bunnyimg")
        .show()
        .css("left", "1100px");
    }

    const $okHunt = "<button id='okHunt'>Done</button>";

    setTimeout(function() {
      $(".hunt").append($okHunt);
    }, 7500);
  },
  interact: function(num) {
    if (num === 1) {
      oxMusic.pause();
      boxMusic.play();
      const $interactionDiv = $(".boxInfo");
      $(".game-screen").hide();
      const $interaction1 = $(
        "<h1 id='boxstatement'>You've found a crate and barrel on the side of the road!</h1>"
      );
      const $interaction1Quest = $(
        "<h2 id='boxquestion'>Would you like to open it at your own risk?</h2>"
      );
      const $interaction1Image = $(
        "<img id='empty-crate' src='https://i.pinimg.com/originals/6c/09/b3/6c09b3d12f557bf77722c3f4acddba3e.jpg'>"
      );
      const $yesButton = $("<button id='yesBox'>Yes</button>");
      const $noButton = $("<button id='noBox'>No</button>");
      $interactionDiv.append($interaction1);
      $interactionDiv.append($interaction1Quest);
      $interactionDiv.append($interaction1Image);
      $(".boxButtons").append($yesButton);
      $(".boxButtons").append($noButton);
    } else if (num === 2) {
      oxMusic.pause();
      riverMusic.play();
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
        boxMusic.pause();
        beesMusic.play();
        removeStuff();
        const $badStatus = $(
          "<h2>The crate contained a hoard of wasps. You managed to escape, but at the expense of getting stung quite a few times.</h2>"
        );
        $(".boxInfo").append($badStatus);
        $(".boxInfo").append(
          $(
            "<img id='wasp' src='https://bestanimations.com/Animals/Insects/Bees/bee-animated-gif-61.gif'>"
          )
        );
        $(".boxInfo").append($("<button class='boxOk'>Ok</button>"));
        this.health -= 30;
        this.saveStats();
      } else {
        boxMusic.pause();
        goodBoxMusic.play();
        removeStuff();
        const $goodStatus = $(
          "<h2>The crate contained a bunch of food! It must've dropped off of someone else's wagon, but it's yours now!</h2>"
        );
        $(".boxInfo").append($goodStatus);
        $(".boxInfo").append(
          $(
            "<img id='box-food' src='https://www.jing.fm/clipimg/detail/12-126337_b-fruit-clipart-food-clipart-garden-clipart.png'>"
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
        "<img id='empty-crate' src='https://i.pinimg.com/originals/6c/09/b3/6c09b3d12f557bf77722c3f4acddba3e.jpg'>"
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
        "https://thumbs.gfycat.com/WindySlightFlea-size_restricted.gif"
      );
      $(".riverButtons").append($("<button class='riverOk'>Ok</button>"));
      if (this.food > 30) {
        this.food -= 30;
        this.saveStats();
      } else {
        this.food = 0;
        this.saveStats();
      }
    } else if (answer === "wait") {
      $(".riverInfo").prepend(
        $(
          "<h1>You decided to wait a day. The river calms down and you cross without any damage, but the hot sun causes you to have heat exhaustion.</h1>"
        )
      );
      $("#riverImage").attr("src", "https://i.gifer.com/JzDJ.gif");
      $("#riverImage").attr("id", "crossingRiver");
      this.days++;
      if (this.food > 18) {
        this.food -= 18;
        this.saveStats();
      } else if (this.food < 18) {
        this.food = 0;
        this.saveStats();
      }
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
      if (this.food > 10) {
        this.food -= 15;
      } else {
        this.food = 0;
      }
      this.health -= 10;
      this.saveStats();
      $(".riverButtons").append($("<button class='riverOk'>Ok</button>"));
    }
  },
  starveCondition: function() {
    if (this.food <= 1) {
      $(".message-box").text(
        "I'm starving! My health will drop now unless you can find some food."
      );
      if (this.health > 5) {
        this.health -= 2;
        this.saveStats();
      } else if (this.food < 1 && this.health === 0) {
        this.health = 0;
        this.saveStats();
      } else {
        this.saveStats();
      }
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
    const money = this.money;
    $("#hp").text(`Health: ${this.health.toFixed(1)}`);
    $("#food").text(`Food: ${this.food.toFixed(1)}`);
    $("#distance").text(`Distance Traveled: ${this.distance.toFixed(1)}`);
    $("#days").text(`Day: ${this.days}`);
    $("#money").text(`Money: $${this.money}`);
  },
  town: function() {
    oxMusic.pause();
    townMusic.play();
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
    $(".townButtons").append($("<button id='moveOn'>Move on</button>"));
    $(".townButtons").append(
      $(
        "<button id='goToStore'>Stop by the store to buy goods. (Can only go once)</button>"
      )
    );
    $(".townButtons").append(
      $("<button id='rest'>Rest a day to restore health + get money.</button>")
    );
  },
  randomVoiceLines: function(ran) {
    const $messageBox = $(".message-box");

    function fade() {
      $(".message-box").text("");
    }
    if (ran === 0) {
      $messageBox.text(
        "I can't wait to get to Oregon! I'm gonna be rich and have so much land!"
      );

      setTimeout(fade, 4000);
    } else if (ran === 1) {
      $messageBox.text(
        "What a nice day! I gotta get to Oregon before this winter storm hits."
      );

      setTimeout(fade, 4000);
    } else if (ran === 2) {
      $messageBox.text(
        "This trip was last minute. That's why I don't have much saved up..."
      );

      setTimeout(fade, 4000);
    } else if (ran === 3) {
      $messageBox.text(
        "Man, I wonder what the first thing I'll eat in Oregon is..."
      );

      setTimeout(fade, 4000);
    } else if (ran === 4) {
      $messageBox.text(
        "My oxen are the best! I couldn't have done without them this trip"
      );
      setTimeout(fade, 4000);
    }
  },
  townInteractions(choice) {
    clearInterval(this.playerTimer);
    if (choice === "moveOn") {
      $(".town-interactions").hide();
      this.resumeGame();
      $(".message-box").text("You've moved passed the town.");

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
      setTimeout(townAgain, 2000);

      function townAgain() {
        $(".message-box").text("");
        $(".game-screen").hide();
        $(".town-interactions").show();
      }
    }
  },
  store: function() {
    townMusic.pause();
    storeMusic.play();
    $(".storeDiv").show();
    clearInterval(this.playerTimer);
    let total = 0;
    let eggsBought = 0;
    let meatBought = 0;
    let ointmentBought = 0;
    let wagonPartsBought = 0;
    $(".town-interactions").hide();
    const $storeDiv = $(".storeDiv");
    const $itemsDiv = $(".items");
    $(".storeOwner").append(
      $(
        "<img class='storeStuff' id='storeOwner' src='https://i.imgur.com/Th2wTxH.png'>"
      )
    );
    $storeDiv.prepend(
      $(
        `<h3 class='storeStuff' id='storeprompt'>Welcome to my general store! You currently have $${this.money}.</br> What would you like to buy today? I have a limit of one wagon part and two for everything else.</h3>`
      )
    );
    const $eggs = $(
      "<button class='storeStuff' id='buyEggs'>Eggs: $5 each dozen (+12 food)</button>"
    );

    const $meat = $(
      "<button class='storeStuff' id='buyMeat'>Meat: $8 for a steak (+20 food) </button>"
    );

    const $ointment = $(
      "<button class='storeStuff' id='ointment'>Ointment: $6 for a bottle (+10 health) </button>"
    );

    const $wagonParts = $(
      "<button class='storeStuff' id='wagonParts'>Wagon Parts: $35 (restores your wagon to full HP) </button>"
    );

    $itemsDiv.append($eggs);
    $itemsDiv.append($meat);
    $itemsDiv.append($ointment);
    $itemsDiv.append($wagonParts);
    $(".store-box").css("border", "2px solid white");
    $(".store-box").html(
      `<h3 class='storeStuff' id='total'>Current total: ${total}</h3><h4 class='storeStuff' id='totalEggs'>Eggs bought: ${eggsBought}</h4><h4  class='storeStuff' id='totalMeat'>Meat bought: ${meatBought}</h4><h4 class='storeStuff' id='totalOintment'>Ointment bought: ${ointmentBought}</h4><h4 class='storeStuff'  id='totalWagonParts'>Wagon parts bought: ${wagonPartsBought}</h4>`
    );

    $storeDiv.append("<button class='storeStuff' id='storeOk'>Ok</button>");

    $("body").on("click", ".items", function(event) {
      function updateTotals() {
        $("#totalEggs").text(`Eggs bought: ${eggsBought}`);
        $("#totalMeat").text(`Meat bought: ${meatBought}`);
        $("#total").text(`Current total: ${total}`);
        $("#totalOintment").text(`Ointment bought: ${ointmentBought}`);
        $("#totalWagonParts").text(`Wagon parts bought: ${wagonPartsBought}`);
      }

      if (event.target.id === "buyEggs" && eggsBought < 2) {
        eggsBought++;
        total += 3;
        game.total = total;
        updateTotals();
      } else if (event.target.id === "buyMeat" && meatBought < 2) {
        meatBought++;
        total += 8;
        game.total = total;
        updateTotals();
      } else if (event.target.id === "ointment" && ointmentBought < 2) {
        ointmentBought++;
        total += 6;
        game.total = total;
        updateTotals();
      } else if (event.target.id === "wagonParts" && wagonPartsBought < 1) {
        wagonPartsBought++;
        total += 35;
        game.total = total;
        updateTotals();
      }
    });

    $("body").on("click", "#storeOk", function() {
      storeMusic.pause();
      townMusic.play();
      if (game.money >= total) {
        const eggsTot = eggsBought * 12;
        const meatTot = meatBought * 20;
        const ointmentTot = ointmentBought * 10;
        const wagonTot = wagonPartsBought;
        game.food += eggsTot;
        game.food += meatTot;
        game.health += ointmentTot;
        if (wagonTot === 1) {
          game.wagon.health = 100;
        }
        game.saveStats();
      }
      game.checkMoney();
      setTimeout(game.randomVoiceLines(4), 5000);
    });
  },

  checkMoney: function() {
    if (this.money < this.total) {
      $(".storeStuff").remove();
      this.store();
      $("#storeprompt").text(
        "You don't seem to have enough for that purchase, buddy. Try again."
      );
      this.total = 0;
    } else {
      this.money -= this.total;
      this.total = 0;
      $("#storeprompt").text(
        "Thanks for your purchase buddy! Hope you get to where ever you're trying to go safely."
      );

      setTimeout(resumeGame, 2000);

      function resumeGame() {
        $(".storeDiv").hide();
        $(".town-interactions").show();
        $("#goToStore").remove();
      }
    }
  },
  winOrLose: function() {
    if (
      this.distance >= 75 &&
      this.health > 0 &&
      this.days <= 10 &&
      this.wagon.health > 1
    ) {
      oxMusic.pause();
      winMusic.play();
      clearInterval(this.playerTimer);
      $(".game").remove();
      const $winDiv = $(".win");
      $winDiv.append($("<h1>Congrats! You've made it to Oregon!</h1>"));
      $winDiv.append(
        $(
          "<img src='https://cdn.vox-cdn.com/thumbor/5UOEwi1yQauMOb0fD5bqGqmLcbA=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/3378408/hangingoutwithoxen.0.png'>"
        )
      );
    } else if (this.health <= 0 || this.days > 10 || this.wagon.health <= 0) {
      oxMusic.pause();
      loseMusic.play();
      clearInterval(this.playerTimer);
      $(".game").hide();
      const $loseDiv = $(".lose");
      $loseDiv.append($("<h1>You didn't make it to Oregon. Try again.</h1>"));
      $loseDiv.append(
        $(
          "<img src='https://media0.giphy.com/media/3oz8xBKJFKAXB6JAm4/source.gif'>"
        )
      );
    }
  }
};

//event listeners

$("#start-button").on("click", function() {
  const pName = $("#name-entry-input").val();
  game.startGame(pName);
  mainMusic.play();
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
  game.decideSpeed("Move very slowly");
});

$("body").on("click", "#yesStart", function() {
  mainMusic.pause();
  oxMusic.play();
  game.timer();
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
    $walkButtons.append(
      $("<button id='stop-button'>Move very slowly (Gain HP)</button>")
    );
  }

  setTimeout(function() {
    game.interact(1);
  }, 25000);
});

$("body").on("click", "#yesBox", function() {
  game.interactionOptionsBox("box");
});

$("body").on("click", "#noBox", function() {
  game.interactionOptionsBox("noBox");
});

$("body").on("click", ".boxOk", function() {
  boxMusic.pause();
  beesMusic.pause();
  goodBoxMusic.pause();
  oxMusic.play();
  $(".boxInfo").remove();
  $(".boxButtons").remove();
  game.resumeGame();
  game.timer();
  setTimeout(function() {
    game.interact(2);
  }, 40000);
  setTimeout(game.randomVoiceLines(0), 5000);
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
  riverMusic.pause();
  oxMusic.play();
  $(".riverInfo").remove();
  $(".riverOk").remove();
  game.resumeGame();
  game.timer();
  setTimeout(function() {
    game.town();
  }, 100000);
  setTimeout(function() {
    game.hunt();
  }, 20000);
  setTimeout(game.randomVoiceLines(1), 5000);
});

$("body").on("click", "#moveOn", function() {
  townMusic.pause();
  oxMusic.play();
  game.townInteractions("moveOn");
});

$("body").on("click", "#rest", function() {
  game.townInteractions("rest");
});

$("body").on("click", "#goToStore", function() {
  game.store();
});

$("body").on("click", "#bunny", function(event) {
  $("#huntprompt").html("<h3 id='niceHunt'>Nice! You got one!</h3>");
  game.food += 25;
  game.saveStats();
});

$("body").on("click", "#okHunt", function() {
  huntMusic.pause();
  oxMusic.play();
  $(".hunt").remove();
  game.resumeGame();
  setTimeout(game.randomVoiceLines(3), 6000);
});
