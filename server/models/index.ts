import Basket from "./Basket";
import Response from "./Comment";
import Goods from "./Goods";
import GoodsInfo from "./GoodsInfo";
import Rating from "./GoodsRating";
import GoodsType from "./GoodsType";
import User from "./User";

User.hasOne(Basket, { foreignKey: "userId" });
Basket.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Rating);
User.hasMany(Response);
GoodsType.hasMany(Goods);
Goods.belongsTo(GoodsType);
Goods.hasOne(GoodsInfo, { foreignKey: "goodsId" });
GoodsInfo.belongsTo(Goods, { foreignKey: "goodsId" });

export default {
  User,
  Basket,
  Goods,
  GoodsType,
  GoodsInfo,
  Rating,
  Response,
};
