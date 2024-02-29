const mockedPresidentData = [
  ["first", "last", "spouse", "elected"],
  ["Jinho", "Lee", "Thomas Doeppner", "2016"],
  ["George", "Washington", "Martha Washington", "1789"],
  ["Thomas", "Jefferson", "Ben Franklin", "2024"],
  ["Ronald", "Reagan", "Nancy Reagan", "1976"],
];

const mockedPresidentNoHeader = [
  ["Jinho", "Lee", "Thomas Doeppner", "2016"],
  ["George", "Washington", "Martha Washington", "1789"],
  ["Thomas", "Jefferson", "Ben Franklin", "2024"],
  ["Ronald", "Reagan", "Nancy Reagan", "1976"],
];

const mockedMetGalaGuests = [
  ["first", "last", "designer", "theme", "year", "slay or nay"],
  ["Kim", "Kardashian", "Balenciaga", "In America", "2021", "slay"],
  ["Karlie", "Kloss", "Gucci", "Camp", "2019", "slay"],
  ["Jared", "Leto", "Joshua Balster", "Karl", "2023", "nay"],
  ["Kylie", "Jenner", "Jennifer Liao", "In America", "2019", "nay"],
  ["Zendaya", "Coleman", "H&M", "Heavenly Bodies", "2018", "slay"],
  ["Tim", "Nelson", "Vivienne Westwood", "Camp", "2019", "slay"],
  [
    "Alejandro",
    "Jackson",
    "Saint Laurent",
    "Strange, Dark, & Mysterious",
    "2024",
    "slay",
  ],
];

const mockedMetResults = [
  ["Karlie", "Kloss", "Gucci", "Camp", "2019", "slay"],
  ["Tim", "Nelson", "Vivienne Westwood", "Camp", "2019", "slay"],
];

const mockedAlejandroMetResults = [
  [
    "Alejandro",
    "Jackson",
    "Saint Laurent",
    "Strange, Dark, & Mysterious",
    "2024",
    "slay",
  ],
];

const mockedPresidentsResults = [["Jinho", "Lee", "Thomas Doeppner", "2016"]];

const mockedEmptyData = [[]];

export {
  mockedPresidentData,
  mockedPresidentsResults as mockedDataResults,
  mockedMetGalaGuests,
  mockedMetResults,
  mockedAlejandroMetResults,
  mockedEmptyData,
};
