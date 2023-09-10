import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class GoodsType extends Model {
  public id!: number;
  public name!: string;
}

GoodsType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "TypeGoods",
  },
);

export default GoodsType;
