// creates the pioneer and his family
class Pioneer {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.illness = null;
    this.healthStatus = "Excellent";
  }
}

// game object

const game = {
  money: 500,
  food: 200,
  days: 0,
  distance: 0,
  wagon: {
    health: 100
  }
};
