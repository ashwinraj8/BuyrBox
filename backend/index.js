const express = require('express');
const cors = require('cors');
// const { default: mongoose } = require('mongoose');
require('./db/config');
const User = require('./db/Users');
const Products = require('./db/Product');

const app  = express();

app.use(express.json());
app.use(cors());
app.post('/register',async (req,resp)=>{

    let user = new User(req.body);
    let result = await user.save();
    result.toObject();
    delete result.password;
    resp.send(result);
})

app.post('/login',async (req,resp)=>{
    // resp.send(req.body);
    
   
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            resp.send(user);
        } else {
            resp.send({Result:'No user found'});
        }
      
    } else {
        resp.send({Result:'No user found'});
    }
})

app.post('/add-product',async (req,res)=>{
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products',async (req,res)=>{
    let products = await Products.find();
    if(products.length>0) res.send(products);
    else res.send({result: 'No products found'})
})


app.delete('/product/:id',async (req,res)=>{
    // res.send('app is working..')
    
    const result = await Products.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get('/product/:id',async (req,res)=>{
    // res.send('app is working..')
    
    const result = await Products.findOne({_id:req.params.id});
    // res.send(result);
    if (result) {
        res.send(result);
    } else {
        res.send({Result:'No Record found'});
    }
});

app.put('/product/:id',async(req,res)=>{
    let result = await Products.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get('/search/:key', async (req,res)=>{
    let result = await Products.find({
        '$or':[
            {name:{$regex: req.params.key}},
            {company:{$regex: req.params.key}},
            {category:{$regex: req.params.key}},
        ]
    });
    res.send(result);
})

app.listen(5000);

//npm run serve