const express = require("express");
const connectToMongo = require("./models/profiles");
const schema = require("./models/profileSchema");
const postSch = require("./models/postSchema");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const JWT_SECRET = "There we are again";
const cors = require("cors");
var ObjectId = require('mongodb').ObjectId;
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 5000;

connectToMongo();
app.use(cors());

app.get('/', (req, res) => {
    res.send();
});

app.get('/query/:name/', (req, res) => {
    res.send(req.params.name);
    console.log(req.params.name);
});


//adduser
app.post('/createU', jsonParser, (req, res) => {
    // res.send('Hello World!');
    console.log('Hello World!');
    console.log(req.body);
    const user1 = new schema({
        email: req.body.email,
        password: req.body.password,
    })
    user1.save((err, obj) => {
        if (!err) {
            res.send("saved");

        } else {
            console.log(err);
            res.send("User already exist");
        }
    });
    const { email } = req.body;

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "22h" });
    user1.token = token;
    // console.log(token);
});
app.post('/createPost', jsonParser, (req, res) => {
    // res.send('Hello World!');
    console.log('Hello World!');
    console.log(req.body);
    const user1 = new postSch({
        // email: req.body.email,
        title: req.body.title,
        desc: req.body.desc,

    })
    user1.save((err, obj) => {
        if (!err) {
            res.send("saved");

        } else {
            console.log(err);
            // res.send("User already exist");
        }
    });
    // console.log(token);
});

//login
app.post('/login', jsonParser, async (req, res) => {
    console.log(req.body);
    const emailIn = req.body.email;
    const passwordIn = req.body.password;


    if (!(emailIn && passwordIn)) {
        res.status(400).send("All input is required");
    }

    const user = await schema.findOne({ email: emailIn });
    console.log(user);
    if (user && (passwordIn === user.password)) {
        const token = jwt.sign({ emailIn }, JWT_SECRET, { expiresIn: "22h" });
        user.token = token;
        res.json(user);
        console.log(token);
    } else {
        res.status(300).send("invalid credentials");
    }
});



//Get all posts
app.get('/getPost', (req, res) => {
    postSch.find({})
        .then((postlist) => {
            res.send(postlist);
        });
});

//delete post by matching id
app.post('/deletePost', jsonParser, (req, res) => {
    const idQ = req.body.id;
    var oid = new ObjectId(idQ);
    console.log(req.body);
    let check = true;
    // console.log(idQ);

    postSch.deleteOne({ _id: oid }, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send("deleted");
    });
});

//update data
app.post('/editPost', jsonParser, (req, res) => {
    // const authQuery = req.body.auth;
    const titleQuery = req.body.title;
    const descQuery = req.body.desc;
    console.log(req.body);
    const idQ = req.body.auth;
    var oid = new ObjectId(idQ);
    console.log(req.body);
    let check = true;

    postSch.updateOne({ _id: oid }, { $set: { title: titleQuery, desc: descQuery } }, function (err, obj) {
        if (err) throw err;
        console.log("1 document updated");
        res.send("updated");
    });
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});