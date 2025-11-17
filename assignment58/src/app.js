const express = require('express')
const app = express()
let data = require('./data.json')
const fs = require('fs')
app.use(express.json())



// =============================================== Server Running ===============================================================

app.listen(3000, ()=>{
    console.log("Server running on 3000 port");
})


// =============================================== fetch product ===============================================================

app.get('/', (req, res)=>{
    res.send(data)
})

// =============================================== new product ===============================================================
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
// =============================================== delete product ===============================================================


app.delete('/delete/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id)
    if(index === -1){
        return res.status(404).json({message: "Product not found"});
    }
    const deleteProduct = data.splice(index, 1)
    fs.writeFileSync('./src/data.json',JSON.stringify(data, null, 2))
    res.status(200).json({
        message: "Product deleted successfully",
        data: deleteProduct
    })
})


// =============================================== update/put product ===============================================================

app.put('/update/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const index = data.findIndex(item => item.id === id)
    if(index === -1){
        return res.status(404).json({message: "Product not found"})
    }
    // old product
    const oldProduct = data[index]
    // new data
    const {name, price, category} = req.body

    //old product data updated here
    data[index] = {
        ...oldProduct,
        name: name || oldProduct.name,
        price: price || oldProduct.price,
        category: category || oldProduct.category
    }

    fs.writeFileSync('./src/data.json', JSON.stringify(data, null, 2))
    res.status(200).json({
        message: "Product updated successfully",
        data: data[index]

    })
})

// =============================================== update specific/patch product ===============================================================

app.patch('/patch/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const index = data.findIndex(item => item.id === id)
    if(index === -1){
        return res.status(404).json({message: "Product not found"})
    }

    const oldProduct = data[index]
    data[index] = {
        ...oldProduct,
        ...req.body
    }

    fs.writeFileSync('./src/data.json', JSON.stringify(data, null, 2))
    res.status(200).json({
        message: "Product updated successfully (PATCH)",
        data: data[index]

    })
})



