import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class Response extends Model {
  public id!: number;
  public Username!: string;
  public message!: string;
}

Response.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Username: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
    modelName: "Response",
  },
);

export default Response;
