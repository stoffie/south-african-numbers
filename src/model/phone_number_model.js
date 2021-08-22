import Sequelize from "sequelize";

export default (sequelize) => {
  return sequelize.define('PhoneNumberModel', {
    number: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  });
}