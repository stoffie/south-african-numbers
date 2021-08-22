import PhoneNumberModelDefinition from "./model/phone_number_model.js";
import {Sequelize} from "sequelize";

const sequelize = new Sequelize('sqlite::memory:')

export const PhoneNumberModel = PhoneNumberModelDefinition(sequelize)

await sequelize.sync({force: true})
console.log(`Database & tables created!`)