const express = require("express");
const mongoose = require("mongoose");
const contents = require("./model/content.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const port = 3000;

dotenv.config();

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/insert", async (req, res) => {
  const { content, username } = req.body;
  try {
    const newcontent = await new contents({ content, username });
    await newcontent.save();

    res.json({ msg: "inserted sucessfully", data: newcontent[0] });
  } catch (err) {
    console.log(err);
    res.json({ msg: err.msg });
    res.json({ msg: err.msg, data: [] });
  }
});
app.post("/edit", async (req, res) => {
  const { editcontent, id } = req.body;

  console.log(req.body);

  try {
    const newEditedContent = await contents.findByIdAndUpdate(id, {
      $set: {
        content: editcontent,
      },
    });

    res.json({ msg: "inserted sucessfully", data: editcontent });
  } catch (err) {
    console.log(err);
    res.json({ msg: err.msg });
    res.json({ msg: err.msg, data: [] });
  }
});

app.get("/contents", async (req, res) => {
  try {
    const All_content = await contents.find();
    res.json({ msg: "", data: All_content[0] });
  } catch (err) {
    res.json({ msg: err.msg, data: [] });
  }
});

app.get("/", async (req, res) => {
  try {
    const All_content = await contents.find();
    res.json({ msg: "", data: All_content[0] });
  } catch (err) {
    res.json({ msg: err.msg, data: [] });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
