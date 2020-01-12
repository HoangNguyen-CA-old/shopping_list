const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const db = `mongodb+srv://Hoang:sPP4Vxtv51Uwa3Yk@cluster0-wj4ek.mongodb.net/test?retryWrites=true&w=majority`;

mongoose
  .connect(db)
  .then(() => console.log('Connected To MongoDB'))
  .catch(err => console.log(err));

//Use Routes

app.use('/api/items', require('./routes/api/items'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
