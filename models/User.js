module.exports = (connect, Sequelize) => {
  const User = connect.define(
    "user",
    {
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      blockTime: {
        type: Sequelize.STRING(20),
        defaultValue: 0,
      },
      userType: {
        type: Sequelize.INTEGER(2),
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return User;
};
