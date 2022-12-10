module.exports = (connect, Sequelize) => {
    const Translation = connect.define("translation", {
        name: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Translation
};