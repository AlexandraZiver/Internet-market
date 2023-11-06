import { $authHost, $host } from "./index";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { User } from "../store/UserStore";
interface JwtRegisterPayload extends JwtPayload, User {
  id: string;
}

const register = async (
  userName: string,
  email: string,
  password: string,
  passwordConfirm: string,
): Promise<JwtRegisterPayload> => {
  try {
    const { data } = await $host.post("api/auth/register", {
      userName,
      email,
      password,
      passwordConfirm,
    });
    localStorage.setItem("token", data);
    return jwt_decode(data);
  } catch (error: any) {
    throw error.response.data.message;
  }
};

const login = async (email: string, password: string): Promise<JwtRegisterPayload> => {
  try {
    const { data } = await $host.post("api/auth/login", { email, password });
    localStorage.setItem("token", data);
    return jwt_decode(data);
  } catch (error: any) {
    throw error.response.data.error;
  }
};

const confirm = async (code: string, id: string | undefined): Promise<any> => {
  const { data } = await $authHost.post(`api/auth/confirm/${id}`, {
    code,
  });
  return data;
};

const deleteUser = async (id: string | undefined): Promise<any> => {
  const { data } = await $authHost.delete(`api/user/${id}`);
  return data;
};

const checkJWT = async (): Promise<JwtRegisterPayload> => {
  const { data } = await $authHost.get("api/auth");
  localStorage.setItem("token", data);
  return jwt_decode(data);
};

export { register, login, confirm, checkJWT, deleteUser };
