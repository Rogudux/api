import { Sequelize } from "sequelize-typescript";
import { Homework } from "./models/user.model";
import { envs } from "../config/envs";


export const db = new Sequelize({
    database: envs.MYSQL_NAME,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    host: envs.MYSQL_HOST,
    dialect: "mysql",   
    models: [Homework]
});

export const dbConnection = async ()=>{
    try {
        await db.sync({force:false})
        console.log("Database created")
    } catch (error) {
        console.log(`Error conecting to database ${error}`)
    }
}