const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./config/db');
require("dotenv").config();
const routes = require('./Routes/TodoRoutes');
app.use(express.json());
app.use(cors())

database();

app.use("/api", routes);


const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });



app.get('/', (req, res) => {
  res.send('Hello World');
});
