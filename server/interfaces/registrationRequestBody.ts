import User from "./user";

interface RegistrationRequestBody extends User {
  confirmCode: string;
  id: number;
  passwordСonfirm: string;
}
export default RegistrationRequestBody;
