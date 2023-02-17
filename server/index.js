const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

app.use(express.json());
//Port 
const PORT = process.env.PORT || 6001;

//use cors
app.use(cors());

//import routes
const TodoItemRoute = require('./routes/todoItems');


//connect to mongodb ..
mongoose.connect('mongodb+srv://djhack:12345@cluster0.5kdqw8n.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute);



//connect to server
app.listen(PORT, ()=> console.log("Server connected") );
