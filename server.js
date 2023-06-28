const express = require('express')
const app = express()

//routes
app.get('/', (req, res) => {
    res.send('Hi, NodeJs-CRUD-APP')
})

app.listen(3000, ()=>{
    console.log('node-crud-app is running on port 3000')
})