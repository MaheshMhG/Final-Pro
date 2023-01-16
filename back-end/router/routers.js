const express = require("express");
const router = express.Router();
const usersinfos = require('../controller/usercontrol');

router.post('/user' , usersinfos.user);
router.post('/create',usersinfos.create);
router.get('/images/:image',usersinfos.image);
router.get('/resturant/:resturant_id',usersinfos.resturant);
router.get('/resturantname',usersinfos.resturantname)
router.get('/resturantname1/:location',usersinfos.resturantname1);
router.get('/locationinfo',usersinfos.locationinfo);
router.get('/filter/:resturant_id/:cusine',usersinfos.filter);
router.get('/fooddet/:resturant_id',usersinfos.foodname);
router.post('/checkout',usersinfos.account)
router.get('/sorting/:location/:cusine/:cost',usersinfos.scf)

router.get('/confrom', (req,res) => {
    res.send("getting in router");
})

module.exports = router;

