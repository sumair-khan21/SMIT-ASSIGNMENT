const express = require('express')
const app = express()
let data = require('./data.json')
const fs = require('fs')
app.use(express.json())

app.get('/products', (req, res)=>{
    res.send(data)
})


app.post('/addProduct', (req, res)=>{
    const {name, price, category} = req.body;
    if(!name || !price){
        return res.status(400).json(
            {
                message: "name and price are required"
            }
        )
    }
    const newId = Date.now()
    const newProduct = {
        id: newId,
        name,
        price,
        category: category || "Uncategorized"
    }
    data.push(newProduct)
    fs.writeFileSync(
        './src/data.json',
        JSON.stringify(data, null, 2)
    )
    res.status(200).json({
        message: "Product added successfully",
        data: newProduct
    })

})







app.listen(3000, ()=>{
    console.log("Server running on 3000 port");
    
})


