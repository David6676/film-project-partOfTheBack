const { Op } = require("sequelize");
const { Film, Country, Genres, MovieGenre, FeedBack, Translation, Years } = require("../models");

class FilmController {
    static addFilm = async (req, res) => {
        let { name, producer, actors, description, genres, year, country, translation, time } = req.body

        let film = await Film.create({
            name, producer, actors, description, yearId: year, countryId: country, translationId: translation, time, userId: req.user.id, photo_url: req.files.photo_url[0].filename, video_url: req.files.video_url[0].filename
        })

        genres = JSON.parse(genres)
        for (let i = 0; i < genres.length; i++) {
            let el = genres[i];
            await MovieGenre.create({ filmId: film.id, genreId: el })
        }
        res.send('success')
    }

    static addFeedback = async (req, res) => {
        let { text, filmId } = req.body

        let data = await FeedBack.findOne({
            where: {
                filmId: filmId,
                userId: req.user.id
            }
        })
        if (data) {
            data.text = text
            data.save()
        } else {
            await FeedBack.create({ filmId, userId: req.user.id, text })
        }
        res.send("success")
    }

    static addStar = async (req, res) => {
        let { filmId, star } = req.body

        let data = await FeedBack.findOne({
            where: {
                filmId: filmId,
                userId: req.user.id
            }
        })
        if (data) {
            data.star = star
            data.save()
        } else {
            await FeedBack.create({ filmId: filmId, userId: req.user.id, star: star })
        }

    }

    static getFilm = async (req, res) => {
        let film = await Film.findAll({ include: { all: true, nested: true } })
        res.send({ film })
    }

    static search = async (req, res) => {
        let { text } = req.params
        let film = await Film.findAll({
            where: {
                name: {
                    [Op.like]: text + "%"
                }
            }, include: { all: true, nested: true }
        })
        res.send({ film });
    }

    static searchTranslation = async (req, res) => {
        let { id } = req.params
        let film = await Film.findAll({
            where: {
                translationId: id
            }, include: { all: true, nested: true }
        })
        res.send({ film });
    }

    static searchYear = async (req, res) => {
        let { id } = req.params
        let film = await Film.findAll({
            where: {
                yearId: id
            }, include: { all: true, nested: true }
        })
        res.send({ film });
    }

    static delFilm = async (req, res) => {
        let { id } = req.params;
        await Film.destroy({
            where: {
                id: id
            }
        })
        let films = await Film.findAll()
        res.send(films)
    }

    static getCountry = async (req, res) => {
        let country = await Country.findAll()
        res.send({ country })
    }

    static getTranslation = async (req, res) => {
        let translation = await Translation.findAll()
        res.send({ translation })
    }
    static getYear = async (req, res) => {
        let years = await Years.findAll()
        res.send({ years })
    }

    static getGenres = async (req, res) => {
        let genres = await Genres.findAll()
        res.send({ genres })
    }

    static getSingleFilm = async (req, res) => {
        let { id } = req.params
        let oneFilm = await Film.findOne({
            where: {
                id: id,

            }, include: { all: true, nested: true }
        })
        res.send({ oneFilm })
    }
};

module.exports = FilmController;