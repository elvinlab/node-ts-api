import mongoose, { Connection } from "mongoose";
import Server from "../models/Server";
//import { UserModel } from "./users/users.model";

class Database{

    private database! : mongoose.Connection;

    constructor(){

    }

    connect(){
        const uri = `${process.env.DB_LINK}`;  
        if (this.database) {
            return;
        }
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });  
        console.log('URI ->', uri);
        console.log(`LINK ENV -> ${process.env.DB_LINK}`);

        this.database = mongoose.connection;  
        this.database.once("open", async () => {
            console.log("Connected to database");
        });

        this.database.on("error", () => {
            console.log("Error connecting to database");
        });
    }

    disconnect = () => {  
        if (!this.database) {
        return;
        }  
        mongoose.disconnect();
    };
}

export default Database;

/*
let database: mongoose.Connection;

export const connect = () => { 
    const uri = `${process.env.DB_LINK}`;  
    if (database) {
    return;
    }  
    mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    });  
    console.log('URI ->', uri);
    console.log(`LINK ENV -> ${process.env.DB_LINK}`);
    
    database = mongoose.connection;  database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
export const disconnect = () => {  
    if (!database) {
    return;
    }  
    mongoose.disconnect();
};
*/