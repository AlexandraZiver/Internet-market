import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class GoodsInfo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
}

GoodsInfo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "InfoGoods",
  },
);

export default GoodsInfo;
