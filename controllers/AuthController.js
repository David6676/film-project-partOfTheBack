const bcrypt = require("bcrypt");
const passport = require("passport");
const { Op } = require("sequelize");
const { User } = require("../models");


class AuthController {

  static async signup(req, res) {
    let data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    await User.create(data);
    res.send("success");
  }

  static async LoginCheck(email, password, done) {
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return done(null, false);
    }

    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return done(null, false);
    }
    return done(null, user);
  }

  static Login(req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            res.send({ error: "Something went wrong" });
          }
          res.send({ verify: true, user: req.user });
        });
      } else {
        res.send({ error: "User Not Found" });
      }
    })(req, res, next);
  }

  static async GetUser(req, res) {
    res.send({ user: req.user });
  }

  static users = async (req, res) => {
    let users = await User.findAll({
      where: {
        id: { [Op.not]: req.user.id }
      }
    })
    console.log(users);
    res.send({ users })
  }

  static Block = async (req, res) => {
    console.log(req.params);
    let min5 = Date.now() + (5 * 300 * 100)
    await User.update({ blockTime: min5 }, {
      where: {
        id: req.params.id
      }
    })
    res.send("success")
  }


  static Logout(req, res) {
    req.logout(() => {
      res.send({ status: "OK" });
    });
  }
}

module.exports = AuthController;
