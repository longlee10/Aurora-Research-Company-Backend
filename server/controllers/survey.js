/*******************************
File Name: survey.js
Description: It is the survey controller to do specific actions.
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
const Survey = require("../models/survey");
const jwt = require("jsonwebtoken");

/* Obtain user from payload */
getUser = (req) => {
  const auth = req.headers.authorization;
  if (auth == undefined) {
    return undefined;
  } else {
    return jwt.verify(auth.split(" ")[1], process.env.JWT_KEY);
  }
};

/* User surveys */
module.exports.myList = (req, res, next) => {
  const user = getUser(req);
  // Find results
  Survey.find({author: user == undefined ? undefined : user.username }).exec((err, list) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const results = list.map((survey) => ({
        _id: survey._id,
        name: survey.name,
        description: survey.description,
      }));
      res.status(200).json(results);
    }
  });
};

/* List surveys */
module.exports.list = (req, res, next) => {
  // Find results
  Survey.find({isActive: true}).exec((err, list) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const results = list.map((survey) => ({
        _id: survey._id,
        name: survey.name,
        description: survey.description,
        start_time: survey.start_time,
        end_time: survey.end_time
      }));
      res.status(200).json(results);
    }
  });
};

/* Get a survey item */
module.exports.item = (req, res, next) => {
  Survey.findById(req.body._id, (err, survey) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(survey);
    }
  });
};

/* Get a survey item (Without answers) */
module.exports.itemWithoutAnswers = (req, res, next) => {
  Survey.findById(req.body._id, (err, survey) => {
    if (err) {
      res.status(500).json(err);
    } else if (survey == null) {
      res.status(500).json({ message: "Invalid survey id." });
    } else {
      survey.answers = [];
      res.status(200).json(survey);
    }
  });
};

/* Add a survey */
module.exports.add = (req, res, next) => {
  // Force to set active
  req.body.isActive = true;
  Survey.create(req.body, (err, survey) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({});
    }
  });
};

/* Update a survey */
module.exports.update = (req, res, next) => {
  Survey.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      description: req.body.description,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      questions: req.body.questions,
    },
    (err, survey) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({});
      }
    }
  );
};

/* Delete a survey */
module.exports.delete = (req, res, next) => {
  Survey.deleteOne({ _id: req.body._id }, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({});
    }
  });
};

/* Answer a survey */
module.exports.answer = (req, res, next) => {
  Survey.updateOne(
    { _id: req.body._id },
    { $push: { answers: req.body.answers } },
    (err, survey) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({});
      }
    }
  );
};
