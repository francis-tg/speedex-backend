"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Magasin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Stock, {
				foreignKey: "stock_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.User, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
		}
	}
	Magasin.init(
		{
			name: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
			stock_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Magasin",
		},
	);
	return Magasin;
};