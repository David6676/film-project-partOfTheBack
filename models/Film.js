module.exports = (connect, Sequelize) => {
    const Film = connect.define("film", {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        producer: {
            type: Sequelize.STRING,
        },
        actors: {
            type: Sequelize.STRING,
        },
        yearId: {
            type: Sequelize.INTEGER,
            references: {
                model: "year",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
        translationId: {
            type: Sequelize.INTEGER,
            references: {
                model: "translation",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
        time: {
            type: Sequelize.STRING,
        },
        countryId: {
            type: Sequelize.INTEGER,
            references: {
                model: "country",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
        photo_url: {
            type: Sequelize.STRING
        },
        video_url: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Film
};