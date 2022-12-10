module.exports = (connect, Sequelize) => {
    const Message = connect.define("message", {
        fromId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
        toId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        },
        time: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        text: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Message
};