// 登录接口参数
export interface ILogin {
  username: string;
  password: string;
}

export interface ISingUp {
  username: string;
  password: string;
  email: string;
  phone: string;
  question: string;
  answer: string;
  role?: number;
}

export interface IUserInfo {
  username: string;
  email: string;
  phone: string;
  question: string;
  answer: string;
  role: number;
}

export interface IUpdateUserInfo {
  email: string;
  phone: string;
  question: string;
  answer: string;
}
