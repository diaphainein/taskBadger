module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
  	task:  {
        type: DataTypes.STRING,
        allowNull: false
        },
    deadline:  {
        type: DataTypes.STRING,
        allowNull: false
        },
    hourly:  {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
    daily:  {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
    weekly:  {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
    complete:  {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
    u_id:   {
    	type: DataTypes.INTEGER,
    	allowNull: false
    }
  })
  return Task;
};