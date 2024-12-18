import type {
  ILogin,
  IUserInfo,
  IRegister,
  IUpdateUserInfo,
} from '~types/user.types';
import { postInstanceCRUD } from '../utils/axios';

export const userAPI = {
  singup: async () => {
    return await postInstanceCRUD<ILogin, IUserInfo>('/auth/signup');
  },
};
