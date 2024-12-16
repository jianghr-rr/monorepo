import type {
  ILogin,
  IUserInfo,
  IRegister,
  IUpdateUserInfo,
} from '~types/user.types';
import { postInstanceCRUD } from './axios';

export const userAPI = {
  login: async (login: ILogin) => {
    return await postInstanceCRUD<ILogin, IUserInfo>(`user/login.do`, {
      username: login.username,
      password: login.password,
    });
  },

  logout: async () => {
    return await postInstanceCRUD<null>(`user/logout.do`);
  },

  register: async (register: IRegister) => {
    return await postInstanceCRUD<IRegister, IUserInfo>(`user/register.do`, {
      ...register,
    });
  },

  getUserInfo: async () => {
    return await postInstanceCRUD<null, IUserInfo>(`user/get_user_info.do`);
  },

  updateUserInfo: async (updateUserInfo: IUpdateUserInfo) => {
    return await postInstanceCRUD<IUpdateUserInfo, IUserInfo>(
      `user/update_information.do`,
      updateUserInfo
    );
  },

  resetPassword: async (passwordOld: string, passwordNew: string) => {
    return await postInstanceCRUD<
      { passwordOld: string; passwordNew: string },
      IUserInfo
    >(`user/reset_password.do`, {
      passwordOld,
      passwordNew,
    });
  },

  forgetCheckAnswer: async (
    username: string,
    question: string,
    answer: string
  ) => {
    return await postInstanceCRUD<
      { username: string; question: string; answer: string },
      string
    >(`user/forget_check_answer.do`, {
      username,
      question,
      answer,
    });
  },

  forgetResetPassword: async (
    username: string,
    password: string,
    forgetToken: string
  ) => {
    return await postInstanceCRUD<
      { username: string; password: string; forgetToken: string },
      string
    >(`user/forget_reset_password.do`, {
      username,
      password,
      forgetToken,
    });
  },
};
