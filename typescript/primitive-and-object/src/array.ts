/**
 * 在 TypeScript 中有两种方式来声明一个数组类型：
 */
const arr1: string[] = [];
const arr2: Array<string> = [];

const arr3: string[] = ['a', 'b', 'c'];

console.log(arr3[599]); // 不报错

// 元组（Tuple）
const arr4: [string, string, string] = ['a', 'b', 'c'];

const arr5: [string, number, boolean] = ['abc', 599, true];

// console.log(arr4[599]); // 报错

const arr6: [string, number?, boolean?] = ['abc'];

// 这么写也可以
// const arr6: [string, number?, boolean?] = ['abc', , ,];

type TupleLength = typeof arr6.length; // 1 | 2 | 3

const arr7: [name: string, age: number, male: boolean] = ['abc', 599, true];

// const [name, age, male, other] = arr5;

export {};