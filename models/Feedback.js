module.exports = (connect, Sequelize) => {
    const FeedBack = connect.define("feedback", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
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
        text: {
            type: Sequelize.STRING,
        },
        star: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    return FeedBack
};