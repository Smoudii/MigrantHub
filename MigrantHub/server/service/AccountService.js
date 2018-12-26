const bcrypt = require('bcryptjs');
const BusinessAccountValidator = require('../validators/BusinessAccountValidator');
const AdminAccountValidator = require('../validators/AdminAccountValidator');
const MigrantRepository = require('../repository/MigrantRepository');
const BusinessRepository = require('../repository/BusinessRepository');
const AdminRepository = require('../repository/AdminRepository');
const { ServerError } = require('../errors/ServerError');
const ExpressValidator = require('express-validator/check');
const { errorFormatter } = require('../controllers/ControllerUtils');

module.exports = {
  async createUser(parsedMigrantUserObject, validationObject) {
    const migrantUserObject = parsedMigrantUserObject;
    const errors = ExpressValidator.validationResult(validationObject).formatWith(errorFormatter);

    if (errors.isEmpty()) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(migrantUserObject.password, salt);
      migrantUserObject.password = hash;

      return MigrantRepository.createUser(migrantUserObject);
    }
    throw new ServerError('There was an error creating migrant user.', 400, errors.array());
  },

  async createBusiness(parsedBusinessUserObject) {
    const businessUserObject = parsedBusinessUserObject;
    const errors = await BusinessAccountValidator.businessAccountValidator(businessUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(businessUserObject.password, salt);
      businessUserObject.password = hash;

      return BusinessRepository.createBusiness(businessUserObject);
    }
    throw new ServerError('There was an error creating business user.', 400, errors);
  },

  async createAdmin(parsedAdminUserObject) {
    const adminUserObject = parsedAdminUserObject;
    const errors = await AdminAccountValidator.adminAccountValidator(adminUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminUserObject.password, salt);
      adminUserObject.password = hash;

      return AdminRepository.createAdmin(adminUserObject);
    }
    throw new ServerError('There was an error creating admin user.', 400, errors);
  },
};
