import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class Rating extends Model {
  public id!: number;
  public rate!: number;
}

Rating.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize: db,
    modelName: "Rating",
  },
);

export default Rating;
