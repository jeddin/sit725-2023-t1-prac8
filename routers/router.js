let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function(req,res){
    controller.postDoggo(req,res);
});

router.get('/', (req,res)=>{
    controller.getAllDoggos(req,res);
});

router.delete('/', (req,res)=>{
    controller.getAllDoggos(req,res);
});


module.exports = router;