module.exports = function(sequelize, DataTypes) {
	var Memory = sequelize.define("Memory", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		image: {
			type: DataTypes.BLOB,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATEONLY, //DATE without time.
			allowNull: false
		},
		caption: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		}
	});

	Memory.associate = function(models) {
		Memory.belongsTo(models.Child, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Memory;
};

