import mongoose, { Connection, Schema } from "mongoose";

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

        this.database = mongoose.connection;  
        this.database.once("open", async () => {
            console.log("Connected to database :)");
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
