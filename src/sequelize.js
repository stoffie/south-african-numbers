import PhoneNumberModelDefinition from "./model/phone_number_model.js";
import {Sequelize} from "sequelize";

let trimString = function (string, length) {
  return string.length > length ?
    string.substring(0, length) + '...' :
    string;
};

const sequelize = new Sequelize('sqlite::memory:', {
  logging: (msg) => console.log(trimString(msg, 200))
})

export const PhoneNumberModel = PhoneNumberModelDefinition(sequelize)

await sequelize.sync({force: true})
console.log(`Database & tables created!`)