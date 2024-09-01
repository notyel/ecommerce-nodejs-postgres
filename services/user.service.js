const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const response = await models.User.findAll();
    return response;
  }

  async findOne(id) {
    const response = await models.User.findByPk(id);
    if (!response) {
      throw boom.notFound('user not found');
    }
    return response;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
