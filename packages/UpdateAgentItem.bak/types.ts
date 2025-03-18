import {SourceType, Method, BodyParamsType, QueryParamsType} from './const';

// 步骤组件暴露的函数
// 用于获取当前步骤组件里数据，触发校验，主要用于触发步骤组件的校验，数据在store里
export interface StepComponentRef<T> {
    getCurrentValues: () => Promise<T>;
    validateCurrentValues: () => Promise<T>;
    setLoading: (loading: boolean) => void; // 设置步骤组件的loading状态
}

// 步骤列表组件暴露的函数
// 触发具体的某个步骤组件的校验
export interface StepListRef {
    getCurrentValues: <T>() => Promise<T>; // 获取当前步骤组件里的数据
    validateCurrentValues: <T>() => Promise<T>;
    setLoading: (loading: boolean) => void; // 设置步骤组件的loading状态
    getValues: <T>() => Promise<T>; // 获取所有步骤组件里的数据
}

// "sourceType": 来源类型 1-千帆 2-第三方
// "agentId": agent编码，sourcetype为千帆时，此处为appId
// "name": "交通知识问答专家",
// "description": "可以回答交通法规及办理车辆业务相关问题",
// "iconUrl": "http://www.xxx.com/xxxx",
// "method": GET、POST、PUT、DELETE
// "host": "www.baidu.com",
// "path": "api/v1/agent/add",
// "label": [
//     {"id": 1, "name":"体育"， "children":[
//         {"id": 2, "name":"篮球"},
//         {"id": 3, "name":"足球"}
//     ]}
// ],
export interface IStep0Base {
    sourceType: keyof typeof SourceType;
    name: string;
    description: string;
    method: keyof typeof Method;
    host: string;
    path: string;
    label: TagNode[];
    iconUrl?: string;
    triggerWord?: string[];
}

// 当 sourceType = 1 时，agentId 必填
export type IStep0 = IStep0Base & (
    { sourceType: 1, agentId: string } |
    { sourceType: 2, agentId?: string }
);

export type FieldBodyParamsType = keyof typeof BodyParamsType;

export type FieldBodyParamsDefaultValue<T extends FieldBodyParamsType> =
    T extends 'string' ? string :
    T extends 'number' ? number :
    T extends 'float' ? number :
    T extends 'boolean' ? boolean :
    T extends 'array' ? string[] :
    T extends 'object' ? Record<string, any> :
    never;
export interface IBodyParamsField<T extends FieldBodyParamsType = FieldBodyParamsType> {
    feId: number; // 前端id
    name: string;
    alias: string;
    type: T;
    defaultValue: FieldBodyParamsDefaultValue<T>;
    required: number;
    description: string;
    list: T extends 'object' ? IBodyParamsField[] : [];
}

export type FieldQueryParamsType = keyof typeof QueryParamsType;

export type FieldQueryParamsDefaultValue<T extends FieldQueryParamsType> =
    T extends 'string' ? string :
    T extends 'number' ? number :
    T extends 'float' ? number :
    T extends 'boolean' ? boolean :
    never;
export interface IQueryParamsField<T extends FieldQueryParamsType = FieldQueryParamsType> {
    feId: number; // 前端id
    name: string;
    alias: string;
    type: T;
    defaultValue: FieldBodyParamsDefaultValue<T>;
    required: number;
    description: string;
    list: T extends 'object' ? IBodyParamsField[] : [];
}
export interface IStep1 {
    body: IBodyParamsField[] | null;
    query: IQueryParamsField[] | null;
    header: IQueryParamsField[] | null;
}

export interface IStep2 {
    response: IQueryParamsField[] | null;
}

export interface IStep3 {
    debugSave: 0 | 1;
    debugBody: Record<string, any> | null;
    debugHeader: Record<string, any> | null;
    debugQuery: Record<string, any> | null;
}

export interface IRunAgentParams {
    agentId: string;
    requestUrl: string;
    body?: string;
    query?: Record<string, any>;
    header?: Record<string, any>;
    saveChecked?: boolean;
}

// "timeConsumed": 1234,
// "responseCode": "200",
// "responseBody": "{'message':'hello world'}"
// "message": string
// "code": number
export interface IStep3Res {
    timeConsumed?: number;
    responseCode?: string;
    responseBody?: string;
    message?: string;
}

// 标签树结构
export interface TagNode {
    id: number;
    parentId: number;
    code: string;
    name: string;
    children?: TagNode[] | null;
  }
