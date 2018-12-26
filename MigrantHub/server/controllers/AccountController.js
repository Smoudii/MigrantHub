const qs = require('qs');
const AccountService = require('../service/AccountService');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  async createUser(migrantUserObject, validationObject) {
    const parsedMigrantUserObject = qs.parse(migrantUserObject);
    return AccountService.createUser(parsedMigrantUserObject, validationObject);
  },

  async createBusiness(businessUserObject, validationObject) {
    const parsedBusinessUserObject = qs.parse(businessUserObject);
    return AccountService.createBusiness(parsedBusinessUserObject, validationObject);
  },

  async createAdmin(adminUserObject, validationObject) {
    const parsedAdminUserObject = qs.parse(adminUserObject);
    return AccountService.createAdmin(parsedAdminUserObject, validationObject);
  },

  async getUserType(user) {
    if (user) {
      const userObject = {
        email: user._id,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return Promise.resolve(userObject);
    }
    throw new ServerError('Error retrieving user.', 400, `User value: ${user}`);
  },

  async getUser(userObject) {
    if (userObject) {
      return Promise.resolve({ user: userObject });
    }
    return Promise.resolve({ user: null });
  },
};
