const express = require("express");
// const {signup, signin}=require('../Controlers/userController')

const router = express.Router();
// const {signin,signup}=require('../Controlers/userController')

const adminModel=require("../Models/adminModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY="NOTESAPI"


const ComplainModel=require('../Models/complainModel');


router.get("/complaintGet", (req, res) => {
  const data=ComplainModel.find({})
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    console.log(err);
  })
  // res.send('<h1>hey</h1>');
});

router.post('/complaintSave',async (req,res)=>{
    const data=req.body;
    console.log("Server"+data)
    const newComplain=new ComplainModel(data);

    const result= await newComplain.save();
    if(result)
    {
        res.status(201).json({msg:"data Save successfully"});
    }
    else{
        res.status(500).json({msg:"failed contact admin"});
    }

    
})
router.delete('/complaintDelete/:id',(req,res)=>{
  let id=req.params.id;
  ComplainModel.findByIdAndDelete(id).then(docs=>{
    res.status(200).send(docs);
  }).catch(err=>{
    res.status(500).send(err);
  })

})

router.put('/complaintProcessingPut/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    await ComplainModel.findByIdAndUpdate({_id:id},{status:'Processing'},{new:true})
    .then(data=>{
      res.status(201).send(data);
    })
    .catch(err=>{
      res.status(500).send(err);
    })
    
})
router.put('/complaintSolvedPut/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    await ComplainModel.findByIdAndUpdate({_id:id},{status:'Solved'},{new:true})
    .then(data=>{
      res.status(201).send(data);
    })
    .catch(err=>{
      res.status(500).send(err);
    })
    
})

router.post('/signup',async (req,res)=>{
  //exists
  //hashpass
  //usercreate
  //tokken

  const {firstname,lastname,username,email,password}=req.body;
  try{
      const existUser=await adminModel.findOne({email:email});
      if(existUser)
      {
          return res.status(400).json({message: "User already exists"});
      }
      const hashedPassword=await  bcrypt.hash(password,10);
      const result= await adminModel.create({
          firstName:firstname,
          lastName:lastname,
          email:email,
          password:hashedPassword,
          username:username
      });

      const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY);
      res.status(201).json({user:result,token});
  }catch(error){

      console.log(error);
      res.status(500).json({message:'Somthing Wrong in server'})

  }
});
router.post('/signin',async (req,res)=>{
  const {email,password}=req.body;
  try{
    const existUser=await adminModel.findOne({email:email});
      if(!existUser)
      {
          return res.status(404).json({message: "User not found"});
      }

      const matchPassword=await bcrypt.compare(password,existUser.password);
      if(!matchPassword)
      {
        return res.status(400).json({message:"Invalid Credentials"})
      }
      const token=jwt.sign({email:existUser.email,id:existUser._id},SECRET_KEY);
      res.status(201).json({user:existUser,token});


    }
  catch(error){
    console.log(error);
      res.status(500).json({message:'Somthing Wrong in server'})

  }
});




module.exports = router;
