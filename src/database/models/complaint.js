module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    complainer: DataTypes.STRING,
    complainee: DataTypes.STRING,
    description: DataTypes.STRING,
    complaint_type: DataTypes.INTEGER
  }, {});
  Complaint.associate = (models) => {
    // associations can be defined here
    Complaint.hasOne(models.ComplaintType, {
      as: 'complaint',
      foreignKey: 'complaint_type',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Complaint;
};
