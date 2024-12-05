import type {ILogin} from "~types/user.types";
import { instanceCRUD } from "./axios";


export const userAPI = {
    login: async (login: ILogin): Promise<string> => {
        console.log('login', login);
        const response = await instanceCRUD.post<string>(`user/login.do`, login);
        console.log('response', response);
        return response.data;
    },
}