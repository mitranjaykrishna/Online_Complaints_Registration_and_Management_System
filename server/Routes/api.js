const express = require("express");

const router = express.Router();

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

// router.post('/complainDelete',async(req,res)=>{
//     const _id=req.body;
//     // const result=await ComplainModel.deleteOne({_id:mongoose.Types.ObjectId(id)})
//     res.json(ComplainModel.findByIdAndDelete({_id}));
// })

module.exports = router;
