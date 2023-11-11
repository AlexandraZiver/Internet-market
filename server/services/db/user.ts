import bcrypt from "bcrypt";

import { NUM_SALT_ROUNDS } from "../../constants";
import { User } from "../../interfaces/user";
import models from "../../models";

class UserDB {
  public async createUser(
    userName: string,
    email: string,
    password: string,
    confirmCode: string,
  ): Promise<User> {
    const hashPassword: string = await bcrypt.hash(password, NUM_SALT_ROUNDS);
    const hashConfirmCode = await bcrypt.hash(confirmCode, NUM_SALT_ROUNDS);
    const user = await models.User.create({
      userName,
      email,
      password: hashPassword,
      confirmCode: hashConfirmCode,
    });
    if (!user) {
      throw new Error(" Your basket didn't  create");
    }
    return user;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw new Error(" Your email not registered");
    }
    return user;
  }

  public async getById(id: number): Promise<User | null> {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public async updateConfirmStatus(id: number): Promise<void> {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await models.User.update({ confirmed: true, confirmCode: "" }, { where: { id } });
  }
  public async delete(id: number, user: User): Promise<void> {
    const userFromDb = await this.getById(id);
    if (userFromDb.id !== user.id) {
      throw new Error("You can't delete not your account");
    }
    const deleteUserCount: number = await models.User.destroy({ where: { id } });
    if (deleteUserCount === 0) {
      throw new Error("User didn't delete");
    }
  }

  public async deleteBasket(userId: number): Promise<void> {
    const deleteBasketCount: number = await models.Basket.destroy({ where: { userId } });
    if (deleteBasketCount === 0) {
      throw new Error("Basket didn't delete");
    }
  }
}

export default new UserDB();
