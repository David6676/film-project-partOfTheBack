module.exports = (connect, Sequelize) => {
    const Genres = connect.define("genre", {
        name: {
            type: Sequelize.STRING,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Genres
};