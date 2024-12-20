import type { IUserInfo, ISingUp } from '~types/user.types';
import { postInstanceCRUD } from '../utils/axios';

export const userAPI = {
  singup: async (params: ISingUp) => {
    return await postInstanceCRUD<ISingUp, IUserInfo>('/auth/signup', params);
  },
};
