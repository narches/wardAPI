const validator = require('../middleware/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveMember = (req, res, next) => {
  const validationRule = {
    MRN: { type: String, required: true },
    Name: { type: String, required: true },
    Birth_Date: { type: String, required: true },
    Mission: { type: String, required: true },
    Status: { type: String, required: true },
    Phone: { type: String, required: true },
    Email:  { type: String, required: true, unique: true },
    Address: { type: String, required: true },
    phone: { type: String, required: true },
    Calling: { type: String, required: true },
    Organization: { type: String, required: true },
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
module.exports = {saveUser, saveMember};
