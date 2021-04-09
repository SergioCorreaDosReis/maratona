
let data = {
  name: "Sergio",
  avatar: "https://avatars.githubusercontent.com/u/29148210?v=4",
  "monthly-budget": 3000,
  "days-per-week": 4,
  "hours-per-day": 6,
  "vacation-per-year": 4,
  "value-hour": 75,
}

module.exports = {
  get() {
    return data;
  },
  update(newData){
    // atribui nova data a variavel let
    data = newData;
  }
}
