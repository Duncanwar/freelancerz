module.exports = (sequelize, DataTypes) => {
  const ComplaintType = sequelize.define('ComplaintType', {
    type: DataTypes.STRING
  }, {});
  ComplaintType.associate = (models) => {
    // associations can be defined here
    ComplaintType.belongsTo(models.Complaint, {
      as: 'complaint',
      foreignKey: 'complaint_type',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return ComplaintType;
};
