import type { ILogin, IUserInfo, IRegister } from '~types/user.types';
import { postInstanceCRUD } from './axios';

export const userAPI = {
  login: async (login: ILogin) => {
    return await postInstanceCRUD<ILogin, IUserInfo>(`user/login.do`, {
      username: login.username,
      password: login.password,
    });
  },

  register: async (register: IRegister) => {
    return await postInstanceCRUD<IRegister, IUserInfo>(`user/register.do`, {
      ...register,
    });
  },
};
