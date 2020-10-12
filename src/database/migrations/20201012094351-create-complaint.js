module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Complaints', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    complainer: {
      type: Sequelize.STRING
    },
    complainee: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    complaint_type: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Complaints')
};
