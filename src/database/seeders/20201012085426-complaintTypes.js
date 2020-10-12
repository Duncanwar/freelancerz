module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Complaint-types', [
    {
      type: 'Developer complain about client',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'Client complain about developer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'User complain about services',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Complaint-types', null, {})
};
