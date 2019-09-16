const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

//one argument in mongoose means we try to fetch a model schema
//two arguments in mongoose means we are trying to load something into it
mongoose.model("users", userSchema);
