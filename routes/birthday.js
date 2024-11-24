var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Birthday = require('../model/Birthday');
const birthday = require('../model/Birthday'); // Import the Birthday model


router.get('/', async (req, res) => {
  try 
  {
    const birthdayItems = await Birthday.find(); // Fetch all birthday items from MongoDB
    res.render('birthday', { title: 'Birthday List', birthdayItems });
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get('/add', async (req, res) => {
  try {
    res.render('Birthdays/add', { title: 'Add' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post('/add',async(req,res,next)=>{
  try{
    let newPart = Birthday({
        "DOB":req.body.DOB,
        "firstName":req.body.firstName,
        "lastName":req.body.lastName
    });
    Birthday.create(newPart).then(()=>{
      res.redirect('/birthday');
      })
  }
  catch(err)
  {
      console.error(err);
      res.render('Birthdays/add',{
          error:'Error on the server'
      })
  }
});

router.get('/edit/:id',async(req,res,next)=>{
  try{
      const id = req.params.id;
      const editBirthday= await Birthday.findById(id);
      res.render('Birthdays/edit',
          {
              title:'Edit Birthday',
              Birthday:editBirthday
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

      let updatedBirthday = {
          DOB: req.body.DOB,
          firstName: req.body.firstName,
          lastName: req.body.lastName
      };

      await Birthday.findByIdAndUpdate(id, updatedBirthday);

      res.redirect('/birthday');
  } catch (err) {
      console.error(err);
      res.render('Birthdays/list', {
          error: 'Error on the server'
      });
  }
});

router.get('/delete/:id',async(req,res,next)=>{
  try{
      let id=req.params.id;
      Birthday.deleteOne({_id:id}).then(()=>{
          res.redirect('/birthday')
      })
  }
  catch(error){
      console.error(err);
      res.render('Birthdays/list',{
          error:'Error on the server'
      })
  }
});
module.exports = router;
