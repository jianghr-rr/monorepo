/**
 * 在任何时候都不要，不要，不要使用 Object 以及类似的装箱类型
 * 
 * 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。
 * 但我更推荐进一步区分，也就是使用 Record<string, unknown> 
 * 或 Record<string, any> 表示对象，
 * unknown[] 或 any[] 表示数组，
 * (...args: any[]) => any表示函数这样。
 * 
 * 我们同样要避免使用{}。{}意味着任何非 null / undefined 的值，从这个层面上看，使用它和使用 any 一样恶劣。
 */
// const tmp1: Object = undefined;
// const tmp2: Object = null;
// const tmp3: Object = void 0;
// const tmp4: Object = 'abc';
// const tmp5: Object = 599;
// const tmp6: Object = { name: 'abc' };
// const tmp7: Object = () => {};
// const tmp8: Object = [];

// const tmp9: String = undefined;
// const tmp10: String = null;
// const tmp11: String = void 0;
// const tmp12: String = 'abc';
// // X
// const tmp13: String = 599;
// // X
// const tmp14: String = { name: 'abc' };
// // X
// const tmp15: String = () => {};
// // X
// const tmp16: String = [];

// const tmp17: object = undefined;
// const tmp18: object = null;
// const tmp19: object = void 0;
// // X
// const tmp20: object = 'abc';
// // X
// const tmp21: object = 599;
const tmp22: object = { name: 'abc' };
const tmp23: object = () => {};
const tmp24: object = [];

// // X
// const tmp25: {} = undefined;
// // X
// const tmp26: {} = null;
// // X
// const tmp27: {} = void 0;
const tmp28: {} = 'abc';
const tmp29: {} = 599;
const tmp30: {} = { name: 'abc' };
// tmp30.age = 18;
const tmp31: {} = () => {};
const tmp32: {} = [];

export {};