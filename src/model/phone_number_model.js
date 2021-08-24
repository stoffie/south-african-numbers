import Sequelize from "sequelize";

export default (sequelize) => {
  return sequelize.define('PhoneNumberModel', {
    original: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
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