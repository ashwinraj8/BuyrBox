const express = require('express');
const cors = require('cors');
// const { default: mongoose } = require('mongoose');
require('./db/config');
const User = require('./db/Users');
const Products = require('./db/Product');
const { validationResult } = require('express-validator');

const app = express();

app.use(express.json());
app.use(cors());
app.post('/register', async (req, resp) => {

    let user = new User(req.body);
    let result = await user.save();
    result.toObject();
    delete result.password;
    resp.send(result);
})

app.post('/login', async (req, resp) => {
    // resp.send(req.body);


    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            resp.send(user);
        } else {
            resp.send({ Result: 'No user found' });
        }

    } else {
        resp.send({ Result: 'No user found' });
    }
})

app.get('/users/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', async (req, res) => {
    let products = await Products.find();
    if (products.length > 0) res.send(products);
    else res.send({ result: 'No products found' })
})

app.get('/products/:userId', async (req, res) => {
   
    try {
      const userId = req.params.userId;
      const products = await Products.find({userId});
  
      if (products.length > 0) {
        res.send(products);
      } else {
        res.send({ result: 'No products found for this user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.delete('/product/:id', async (req, res) => {
    // res.send('app is working..')

    const result = await Products.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get('/product/:id', async (req, res) => {

    const result = await Products.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ Result: 'No Record found' });
    }
});

app.put('/product/:id', async (req, res) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get('/search/:key', async (req, res) => {

    // Validation and Sanitization
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Case-Insensitive Search with Regular Expression
        const result = await Products.find({
            $or: [
                { name: { $regex: new RegExp(req.params.key, 'i') } },
                { company: { $regex: new RegExp(req.params.key, 'i') } },
                { category: { $regex: new RegExp(req.params.key, 'i') } },
            ],
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(5000);

//npm run serve