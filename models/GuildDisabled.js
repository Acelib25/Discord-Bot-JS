module.exports = (sequelize, DataTypes) => {
	return sequelize.define('disabled', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		command: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};