/*******************************
File Name: admin.js
Description: It is the admin controller to do specific actions.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

// create a reference to the model
let UserModel = require('../models/user');
let SurveyModel = require('../models/survey');

/* List Users */
module.exports.listUser = (req, res, next) => {
    UserModel.find((error, user_list) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user_list);
        }
    });
}

/* Get User */
module.exports.getUser = (req, res, next) => {
    UserModel.findById(req.params.id, (error, data) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(data);
        }
    });
}

/* Delete user */
module.exports.deleteUser = (req, res, next) => {
    UserModel.findByIdAndRemove(req.params.id, (error, user) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
};

/* Edit user */
module.exports.editUser = (req, res, next) => {
    UserModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body.data,
        },
        (error, user) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(200).json(user);
            }
        },
    )
}
module.exports.listSurvey = (req, res, next) => {
    var fields = { 
        name: true,
        start_time:true,
        end_time:true,
        isActive:true
    };
    SurveyModel.find({},fields,(error, survey_list) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(survey_list);
        }
    });
}

module.exports.updateSurveyStatus = (req, res, next) => {
    SurveyModel.findByIdAndUpdate(req.params.id, {
        isActive: req.body.data,
    }, (error, survey) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send({});
        }
    });
}