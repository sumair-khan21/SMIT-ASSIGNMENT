const express =  require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());


mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_operations_js'
})

app.get('/', (req, res) =>{
    res.json("Hello World");
})
app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})

