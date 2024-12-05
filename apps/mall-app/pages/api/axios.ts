import axios from "axios";

export const instanceRAM = axios.create({
    baseURL: "/api/",
});

// export const BaseUrlCrud = process.env.NODE_ENV === 'development'
//     ? 'http://www.curlyhair.cn:8080/mmall/'
//     //? "https://localhost:8080/"
//     : "http://www.curlyhair.cn:8080/mmall/"

export const instanceCRUD = axios.create({
    baseURL: "/api/",
});

