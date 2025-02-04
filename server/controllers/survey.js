let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

/* INSERTED NEW CODE - pinkherwin */
// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(SurveyList);

            res.render('survey/list', 
            {title: 'List of Surveys', surveyList: surveyList/*,  
        displayName: req.user ? req.user.displayName : ''*/});      
        }
    })
        // To arrange in alphabetical order
        //.sort({"name":1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Create a survey'/*,  
displayName: req.user ? req.user.displayName : ''*/})          
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "title": req.body.title,
        "questions": req.body.questions,
        "answer": req.body.answer
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', {title: 'Edit survey', survey: surveyToEdit/*,  
        displayName: req.user ? req.user.displayName : ''*/})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "questions": req.body.questions,
        "answer": req.body.answer
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business surveys list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the survey list
             res.redirect('/survey-list');
        }
    });
}

/* END of INSERTED CODE - pinkherwin */