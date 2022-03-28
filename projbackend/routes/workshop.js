const express = require("express");
const router = express.Router();

const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createWorkshop , getAllWorkshops , getWorkshopById, bookWorkshop , getMyWorkshops , searchWorkshops} = require('../controllers/workshop')
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("workshopId", getWorkshopById);


router.post(
    "/workshop/create/:userId",
    isSignedin,
    isAuthenticated,
    isAdmin,
    createWorkshop
  );

  router.post(
    "/workshop/book/:userId/:workshopId",
    // isSignedin,
    // isAuthenticated,
    bookWorkshop
  )


router.get('/getallworkshops' , getAllWorkshops)

router.get('/workshops/:userId' ,isSignedin, isAuthenticated,getMyWorkshops)

router.get("/searchworkshops", searchWorkshops)


module.exports = router;