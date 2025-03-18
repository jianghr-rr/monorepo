import {nanoid} from 'nanoid';

export const SourceType = {
    1: '千帆',
    2: '其他',
} as const;

export const Method = {
    'GET': 'GET',
    'POST': 'POST',
} as const;

export const BodyParamsType = {
    'STRING': '字符串',
    'NUMBER': '数字类型',
    'FLOAT': '浮点型',
    'BOOLEAN': '布尔类型',
    'ARRAY': '数组类型',
    'OBJECT': '对象类型',
};

export const QueryParamsType = {
    'STRING': '字符串',
    'NUMBER': '数字类型',
    'FLOAT': '浮点型',
    'BOOLEAN': '布尔类型',
};

export const GetDefaultParams = () => ({
    feId: nanoid(),
    name: '',
    alias: '',
    type: 'STRING',
    defaultValue: '',
    required: 0,
    description: '',
});
