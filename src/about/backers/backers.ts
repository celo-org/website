interface Backer {
  name: string
  photo?: string
}

const people: Backer[] = [
  {
    name: "a16z",
    photo: require("./a16z_new_logo.svg").default.src,
  },
  {
    name: "Polychain Capital",
    photo: require("./polychain.jpg").default.src,
  },
  {
    name: "General Catalyst",
    photo: require("./general-catalyst.jpg").default.src,
  },
  {
    name: "Reid Hoffman",
  },
  {
    name: "Coinbase",
    photo: require("./coinbase.jpg").default.src,
  },
  {
    name: "SV Angel",
    photo: require("./sv-angel.jpg").default.src,
  },
  {
    name: "Social Capital",
    photo: require("./social-capital.jpg").default.src,
  },

  {
    name: "A.Capital",
    photo: require("./a-capital.jpg").default.src,
  },
  {
    name: "Dragonfly Capital Partners",
    photo: require("./dragonfly-capital-partners.jpg").default.src,
  },
  {
    name: "Jack Dorsey",
  },
  {
    name: "Naval Ravikant",
  },
  {
    name: "Casey Neistat",
  },
  {
    name: "Arianna Simpson",
  },
  {
    name: "Tanguy Chau",
  },
  {
    name: "Elad Gil",
  },
  {
    name: "Lakestar",
    photo: require("./lake-star.jpg").default.src,
  },
  {
    name: "Version One",
    photo: require("./version-one.jpg").default.src,
  },
  {
    name: "Greenfield",
    photo: require("./greenfield-one.jpg").default.src,
  },
  {
    name: "9yards Capital",
    photo: require("./9yardscapital.jpg").default.src,
  },
  {
    name: "Andromeda Group",
    photo: require("./andromeda.jpg").default.src,
  },
  {
    name: "Valor",
    photo: require("./valor.jpg").default.src,
  },
  {
    name: "Keisuke Honda",
  },
  {
    name: "Kilowatt Capital",
  },
  {
    name: "Nima Capital",
    photo: require("./nima.jpg").default.src,
  },
  {
    name: "Julia Popowitz",
  },
  {
    name: "Linda Xie",
  },
  {
    name: "Vijay Pandurangan",
  },
  {
    name: "R&R Ventures",
  },
  {
    name: "Nitesh Banta",
  },
  {
    name: "Warren Hogarth",
  },
  {
    name: "Curious Endeavors",
  },
]

export default people
