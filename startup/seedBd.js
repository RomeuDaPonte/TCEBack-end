const { createAdminUser } = require('../models/user');

module.exports = async function seedBd() {
  await createAdminUser();
};
