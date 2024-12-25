import 'server-only';
import { getUserInfo } from '~/dal/get-user-info';
import type { CustomAxiosResponse } from '~/types/request.types';
import type { IUserInfo } from '~/types/user.types';

const getUserInfoDTO = async (
  locale: string
): Promise<CustomAxiosResponse<IUserInfo>> => {
  try {
    const res = await getUserInfo(locale);

    if ('data' in res && res.data) {
      const { id, username, email, phone, question, answer, role } = res.data;
      return {
        code: 1,
        data: {
          id,
          username,
          email,
          phone,
          question,
          answer,
          role,
        },
      };
    }

    return {
      msg: res.msg,
      code: 10,
    };
  } catch (err) {
    // return err;
    return {
      msg: (err as Error)?.message ?? '',
      code: 1001,
    };
  }
};

export default getUserInfoDTO;
export { getUserInfoDTO };
