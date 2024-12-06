const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI="mongodb+srv://ektapatidar416:e-commerce@cluster0.g2ttojp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//"mongodb://localhost:27017/taskmanager"

mongoose.connect(MONGO_URI)
//     , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }


mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
