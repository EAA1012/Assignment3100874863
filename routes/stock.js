// routes/product.js
var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Stock = require('../model/Stock');
const stock = require('../model/Stock'); // Import the Stock model

// GET Product page
router.get('/', async (req, res) => {
  try 
  {
    const stockItems = await Stock.find(); // Fetch all stock items from MongoDB
    res.render('stock', { title: 'Stock List', stockItems });
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get('/add', async (req, res) => {
  try {
    res.render('Parts/add', { title: 'Add' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post('/add',async(req,res,next)=>{
  try{
    let newPart = Stock({
        "description":req.body.description,
        "item":req.body.item,
        "price":req.body.price
    });
    Stock.create(newPart).then(()=>{
      res.redirect('/stock');
      })
  }
  catch(err)
  {
      console.error(err);
      res.render('Parts/add',{
          error:'Error on the server'
      })
  }
});

router.get('/edit/:id',async(req,res,next)=>{
  try{
      const id = req.params.id;
      const editPart= await Stock.findById(id);
      res.render('Parts/edit',
          {
              title:'Edit Part',
              Stock:editPart
          }
      )
  }
  catch(err)
  {
      console.error(err);
      next(err); 
  }
});

router.post('/edit/:id', async (req, res, next) => {
  try {
      let id = req.params.id;

      let updatedPart = {
          description: req.body.description,
          item: req.body.item,
          price: req.body.price
      };

      await Stock.findByIdAndUpdate(id, updatedPart);

      res.redirect('/stock');
  } catch (err) {
      console.error(err);
      res.render('Parts/list', {
          error: 'Error on the server'
      });
  }
});

router.get('/delete/:id',async(req,res,next)=>{
  try{
      let id=req.params.id;
      Stock.deleteOne({_id:id}).then(()=>{
          res.redirect('/stock')
      })
  }
  catch(error){
      console.error(err);
      res.render('Parts/list',{
          error:'Error on the server'
      })
  }
});
module.exports = router;
