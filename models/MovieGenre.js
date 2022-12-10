module.exports = (connect, Sequelize) => {
    const MovieGenres = connect.define("moviegenre", {
        genreId: {
            type: Sequelize.INTEGER,
            references: {
                model: "genre",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
        filmId: {
            type: Sequelize.INTEGER,
            references: {
                model: "film",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return MovieGenres
};