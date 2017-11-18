module.exports = function(sequelize, DataTypes) {
	var Child = sequelize.define("Child", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		dob : {
			type: DataTypes.DATEONLY, //DATE without time.
			allowNull: false
		}
	});

	Child.associate = function(models) {
		Child.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
		Child.hasMany(models.Memory, {
			onDelete: "cascade"
		});
	};

	return Child;
};