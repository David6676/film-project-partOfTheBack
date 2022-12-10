const socketio = require("socket.io");
const http = require("http");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;

const { User, Message } = require("./models");
const AuthController = require("./controllers/AuthController");
const FilmController = require("./controllers/FilmController");
const upload = require("./middleware/upload");
const { Op } = require("sequelize");

const app = express();

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, AuthController.LoginCheck)
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await User.findByPk(id);
  done(null, user);
});

app.post("/add", AuthController.signup);
app.post("/login", AuthController.Login);
app.post("/get", AuthController.GetUser);
app.get("/logout", AuthController.Logout);
app.get("/users", AuthController.users);
app.get("/block/:id", AuthController.Block);

const uploadData = upload.fields([
  { name: "video_url" },
  { name: "photo_url" },
]);

app.post("/addFilm", uploadData, FilmController.addFilm);
app.get("/country", FilmController.getCountry);
app.get("/translation", FilmController.getTranslation);
app.get("/year", FilmController.getYear);
app.get("/getGenres", FilmController.getGenres);
app.get("/getFilm", FilmController.getFilm);
app.get("/getSingleFilm/:id", FilmController.getSingleFilm);
app.get("/getFilm/:text", FilmController.search);
app.post("/addFeedback", FilmController.addFeedback);
app.post("/addStar", FilmController.addStar);
app.get("/searchTranslation/:id", FilmController.searchTranslation);
app.get("/searchYear/:id", FilmController.searchYear);
// app.get("/genreSearch/:id", FilmController.genreSearch)
app.delete("/getFilm/:id", FilmController.delFilm);

io.on("connection", (socket) => {
  console.log("start");
  /** io.emet bolori jamanak tarmacvum e ,, socket.emet ov vor uxarkuma */
  socket.on("getUsers", async (data) => {
    socket.join("user" + data.user);
    let users = await User.findAll({
      where: {
        id: { [Op.not]: data.user },
      },
    });
    socket.emit("sendUsersData", { users });
  });

  /** */
  socket.on("sendMessage", async (data) => {
    console.log(data);
    await Message.create(data.message);
    let messages = await Message.findAll({
      include: { nested: true, all: true },
      where: {
        [Op.or]: [
          { fromId: data.message.fromId, toId: data.message.toId },
          { toId: data.message.fromId, fromId: data.message.toId },
        ],
      },
    });
    console.log(messages);
    socket.broadcast
      .to("user" + data.message.toId)
      .emit("messages", { messages });
    socket.emit("messages", { messages });
  });

  /** */
  socket.on("getAllMessage", async (data) => {
    let messages = await Message.findAll({
      include: { nested: true, all: true },
      where: {
        [Op.or]: [
          { fromId: data.fromId, toId: data.toId },
          { toId: data.fromId, fromId: data.toId },
        ],
      },
    });
    console.log(messages);
    socket.emit("messages", { messages });
  });
});

const connection = app.listen(5000);
io.listen(connection);

// socket-e u server-e nuyn porti vra start anelu hamar