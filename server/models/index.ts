import Basket from "./Basket";
import Goods from "./Goods";
import GoodsInfo from "./GoodsInfo";
import GoodsList from "./GoodsList";
import GoodsType from "./GoodsType";
import Rating from "./Rating";
import Response from "./Response";
import User from "./User";

User.hasOne(Basket, { foreignKey: "userId" });
Basket.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Rating);
User.hasMany(Response);
Basket.hasMany(GoodsList);
GoodsList.belongsTo(Basket);
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
  GoodsList,
  Rating,
  Response,
};
