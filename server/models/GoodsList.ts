import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class GoodsList extends Model {
  public id!: number;
}

GoodsList.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    sequelize: db,
    modelName: "ListGoods",
  },
);

export default GoodsList;
