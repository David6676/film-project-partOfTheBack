module.exports = (connect, Sequelize) => {
    const Year = connect.define("year", {
        name: {
            type: Sequelize.INTEGER,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Year
};