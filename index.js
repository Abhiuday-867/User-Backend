import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
mongoose.connect(
  "mongodb://localhost:27017/myRegister",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

// Routes

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name "],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A tour must have a email "],
    unique: true,
  },
  phn: {
    type: Number,
    required: [true, "A tour must have a name "],
    unique: true,
  },
  city: [String],
  state: [String],
  country: {
    type: String,
    default: "India",
  },
});
const User = new mongoose.model("user", userSchema);
app.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, phn, city, state, country } = req.body;
  const user = new User({
    name,
    email,
    phn,
    city,
    state,
    country,
  });
  user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "successfull " });
    }
  });
});
app.listen(3000, () => {
  console.log("Be started at port 3000");
});
