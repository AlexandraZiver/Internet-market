import bcrypt from "bcrypt";

import { User } from "../interfaces/user";
import errorHandler from "../middleware/errorHandler";
import models from "../models";

class UserDB {
  public async createUser(
    userName: string,
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<User> {
    try {
      const hashPassword: string = await bcrypt.hash(password, 5);
      const user = await models.User.create({
        userName,
        email,
        password: hashPassword,
        confirmCode,
      });
      if (!user) {
        throw new Error(" Your basket didn't  create");
      }
      return user;
    } catch (err) {
      errorHandler(err);
    }
  }

  public async createBasketForUser(userId: number): Promise<{ id: number }> {
    try {
      const basket = await models.Basket.create({
        userId,
      });
      if (!basket) {
        throw new Error(" Your basket didn't  create");
      }
      return basket;
    } catch (err) {
      errorHandler(err);
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error(" Your email not registered");
      }
      return user;
    } catch (err) {
      errorHandler(err);
    }
  }

  public async getUserById(id: number): Promise<User | null> {
    try {
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      errorHandler(err);
    }
  }

  public async updateUserConfirmStatus(id: number): Promise<void> {
    try {
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await models.User.update({ confirmed: true, confirmCode: "" }, { where: { id } });
    } catch (err) {
      errorHandler(err);
    }
  }
  public async deleteUser(id: number): Promise<void> {
    try {
      const deleteUserCount: number = await models.User.destroy({ where: { id } });
      if (deleteUserCount === 0) {
        throw new Error("User didn't delete");
      }
    } catch (err) {
      errorHandler(err);
    }
  }

  public async deleteBasket(userId: number): Promise<void> {
    try {
      const deleteBasketCount: number = await models.Basket.destroy({ where: { userId } });
      if (deleteBasketCount === 0) {
        throw new Error("Basket didn't delete");
      }
    } catch (err) {
      errorHandler(err);
    }
  }
}

export default new UserDB();
