module.exports = (connect, Sequelize) => {
    const Country = connect.define("country", {
        name: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Country
};