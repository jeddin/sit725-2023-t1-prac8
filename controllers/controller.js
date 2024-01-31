let collection = require('../models/doggo');

const postDoggo = (req,res) => {
    let doggo = req.body;
    collection.postDoggo(doggo, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllDoggos = (req,res) => {
    collection.getAllDoggos((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const deleteDoggo = (req,res) => {
    let doggo = req.body;
    collection.deleteOne(doggo, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

module.exports = {postDoggo,getAllDoggos, deleteDoggo}