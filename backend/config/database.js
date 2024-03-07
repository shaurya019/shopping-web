const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://ecommerce:lWQd1lPgpwIu1jL3@ecommerce.ykxsgyr.mongodb.net/?retryWrites=true&w=majority", {})
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((error=>{
        console.log(error);
    }));
};

module.exports = connectDatabase;