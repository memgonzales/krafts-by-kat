const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);

dotenv.config();
const url = process.env.DB_URL;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const database = {

    connect: () =>{
        mongoose.connect(url,options,(err) => {
            if(err) throw err;
            console.log(`Connected to: ` + url);
        });
    },


}

module.exports = database;
