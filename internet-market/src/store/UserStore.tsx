export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

export interface UserStoreInterface {
  setIsAuth(bool: boolean): void;
  setUser(obj: User): void;
  isAuth: boolean;
  user: User;
}

class UserStore implements UserStoreInterface {
  private _isAuth: boolean = false;
  private _user: User = {
    id: "",
    userName: "",
    email: "",
    password: "",
  };
  setIsAuth(bool: boolean): void {
    this._isAuth = bool;
  }

  setUser(obj: User): void {
    this._user = obj;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get user(): User {
    return this._user;
  }
}

export default UserStore;
