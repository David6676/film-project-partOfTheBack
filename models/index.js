const { Sequelize } = require("sequelize");
const { HOST, DB, PASSWORD, USER, DIALECT } = require("../config");
const connect = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

const User = require("./User")(connect, Sequelize);
const Genres = require("./Genres")(connect, Sequelize)
const Country = require("./Country")(connect, Sequelize)
const MovieGenre = require("./MovieGenre")(connect, Sequelize)
const Film = require("./Film")(connect, Sequelize)
const FeedBack = require("./Feedback")(connect, Sequelize)
const Translation = require("./Translation")(connect, Sequelize)
const Years = require("./Years")(connect, Sequelize)
const Message = require("./Message")(connect, Sequelize)


Film.hasMany(FeedBack, { foreignKey: "filmId" })
Film.belongsToMany(Genres, { through: MovieGenre })
Film.belongsTo(User, { foreignKey: "userId" })
Film.belongsTo(Country, { foreignKey: "countryId" })
Film.belongsTo(Translation, { foreignKey: "translationId" })
Film.belongsTo(Years, { foreignKey: "yearId" })
Message.belongsTo(User, { foreignKey: "fromId" })

connect.sync();

module.exports = {
  User,
  Film,
  Genres,
  Country,
  MovieGenre,
  FeedBack,
  Translation,
  Years,
  Message
};
