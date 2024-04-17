import mongoose from 'mongoose'
import React from 'react'

const dbConnection = async () => {
  console.log(process.env.NEXT_PUBLIC_MONGODB_URI);
  
  mongoose.connect("mongodb://127.0.0.1:27017/userauth")
  .then((res) => console.log(`Database is successfully connected with ${res.connection.host}`))
  .catch((error) => console.log(`DB CONNECTION ERROR---> ${error.message}`))
}

export default dbConnection