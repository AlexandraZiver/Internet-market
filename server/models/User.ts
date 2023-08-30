import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public confirmed!: boolean;
  public confirmCode: string;
}

User.init(
  {
    userName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, unique: true },
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmCode: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
    modelName: "User",
  },
);

export default User;
