import { DataTypes, Model } from "sequelize";

import db from "../config/database";

class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public confirmed!: boolean;
  public confirmCode: string;
}

User.init(
  {
    userName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, unique: true },
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmCode: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
    modelName: "User",
  },
);

class TypeGoods extends Model {
  public id!: number;
  public name!: string;
}

TypeGoods.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "TypeGoods",
  },
);

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

class InfoGoods extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
}

InfoGoods.init(
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

class ListGoods extends Model {
  public id!: number;
}

ListGoods.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    sequelize: db,
    modelName: "ListGoods",
  },
);

class Goods extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public rating!: number;
  public img!: string;
}

Goods.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "Goods",
  },
);

class Basket extends Model {
  public id!: number;
}

Basket.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    sequelize: db,
    modelName: "Basket",
  },
);

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

User.hasOne(Basket, {
  foreignKey: "userId",
});

Basket.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Rating);
Rating.belongsTo(User);
User.hasMany(Response);
Response.belongsTo(User);
Basket.hasMany(ListGoods);
ListGoods.belongsTo(Basket);
TypeGoods.hasMany(Goods);
Goods.belongsTo(TypeGoods);

Goods.hasOne(InfoGoods, {
  foreignKey: "goodsId",
});
InfoGoods.belongsTo(Goods, {
  foreignKey: "goodsId",
});

export default { User, TypeGoods, Rating, InfoGoods, ListGoods, Goods, Basket, Response };
