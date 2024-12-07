import type {ILogin} from "~types/user.types";
import { instanceCRUD } from "./axios";

export const userAPI = {
    login: async (login: ILogin): Promise<{
        status: number,
        msg: string,
    }> => {
        const response = await instanceCRUD.post<{
            status: number,
            msg: string,
        }>(`user/login.do`, `username=${login.username}&password=${login.password}`);
        console.log('response', response);
        return response.data;
    },
}