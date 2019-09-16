const express = require('express');
const path = require('path');
const app = express();
const _ = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');
const {getAllComments, addComment, deleteComment, updateComment} = require('./service');
var {connectDb } = require('./Models');

app.use('/assets', express.static('assets', { redirect: false }));

app.use('/dist', express.static('dist', { redirect: false }));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.get('/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.get("/api/comment/getAll", async (req , res)=>{
    var [err,data] = await getAllComments();
    if(err) {
      console.log('Error in Fetching Data -> ', error);
      res.json(null);
    }
    res.json(data);
});

app.post("/api/comment/add",async (req,res)=>{
    const obj = req.body;
    var [err,data]  = await addComment(obj);
    if(err) {
      console.log('Error in Fetching Data -> ', error);
      res.json(null);
    }
    res.json(data);
})

app.post("/api/comment/delete",async (req,res)=>{
  const obj = req.body;
  var [err,data]  = await deleteComment(obj);
  if(err) {
    console.log('Error in Fetching Data -> ', err);
    res.json(null);
  }
  res.json(data);
})

app.post("/api/comment/edit",async (req,res)=>{
  const obj = req.body;
  var [err,data]  = await updateComment(obj);
  if(err) {
    console.log('Error in Fetching Data -> ', err);
    res.json(null);
  }
  res.json(data);
})

connectDb().then(async () => {
  app.listen(8090, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎  Listening on port %s. Open up %s in your browser.', 8090, process.env.PWD);
    }
  })
});
