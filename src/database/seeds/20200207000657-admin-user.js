'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [{
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        password_hash: bcrypt.hashSync('12345678', 8),
        admin: true,
        created_at: new Date(),
        updated_at: new Date()
      }],
      {}
    );
  },

  down: () => {}
};
