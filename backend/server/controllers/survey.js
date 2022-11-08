// create a reference to the model
const Survey = require('../models/survey');

/* List surveys */
module.exports.list = (req, res, next) => {
    // Filter criteria
    const filter = () => {
        const currentDate = new Date();
        if (req.body.onlyActive) {
            return { start_time: { $lte: currentDate }, end_time: { $gte: currentDate } };
        } else {
            return {};
        }
    };
    // Find results
    Survey.find(filter()).exec((err, list) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(list);
        }
    });
}

/* Add a survey */
module.exports.add = (req, res, next) => {
    Survey.create(req.body, (err, survey) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}

/* Update a survey */
module.exports.update = (req, res, next) => {
    Survey.updateOne({_id: req.body._id}, req.body, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}

/* Delete a survey */
module.exports.delete = (req, res, next) => {
    Survey.remove({_id: req.body._id}, (err) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}