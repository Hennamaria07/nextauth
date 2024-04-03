import mongoose from "mongoose";

const databaseConnection = async () => {
    mongoose.connect(process.env.MONGODB_URL!) //process.env.MONGODB_URL! this will guaruntee that it will gave a string
    .then((res) => console.log(`database is successfully connected with ${res.connection.host}`))
    .catch((err) => {
        console.log(`DB ERROR---> ${err.message}`);
        process.exit(1);
    })
}

export default databaseConnection;