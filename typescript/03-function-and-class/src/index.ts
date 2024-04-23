type FuncFoo = (name: string) => number;

const foo: FuncFoo = (name) => {
  return name.length;
};

// 如果只是为了描述这个函数的类型结构，我们甚至可以使用 interface 来进行函数声明：
type FuncFooStruct = (name: string) => number;

// 异步函数、Generator 函数等类型签名
async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asyncGenFunc(): AsyncIterable<void> {}
