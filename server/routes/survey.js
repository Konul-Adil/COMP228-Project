let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

/* INSERTED NEW CODE - pinkherwin */
// connect to our Survey Model
let Survey = require('../models/survey');
let passport = require('passport');
let surveyController = require('../controllers/survey');
/* 
//helper function for guard purposes
 function requireAuth(req,res,next)
    { // check if user is logged in 
     if(!req.isAuthenticated()){ return res.redirect('/login'); 
    } 
    next(); 
} */

/* GET Route for the survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',/* requireAuth,*/surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',/* requireAuth,*/surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id',/* requireAuth,*/surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id',/* requireAuth,*/ surveyController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id',/* requireAuth,*/ surveyController.performDelete);


module.exports = router;
