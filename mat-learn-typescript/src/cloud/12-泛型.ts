import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<12-泛型>>", Prefix.start);

// 12.1 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 12.2 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

// 12.3 泛型变量
/* 大写字母没有区别，只是一种命名的约定的规范。
T（Type）：表示一个 TypeScript 类型。
K（Key）：表示对象中的键类型。
V（Value）：表示对象中的值类型。
E（Element）：表示元素类型。
 */

// 12.3 泛型工具类
/* TypeScript 内置了一些常用的工具类型。例如 Partial, Required, 
Readonly, Record, ReturnType 等。
 */

// typeof
interface Person {
  name: string;
  age: number;
}
const mat: Person = { name: "Mat", age: 18 };
type Mat = typeof mat; // => type Mat = Person
debug(Prefix.standard, "12.3 泛型工具类", mat); // [ '12.3 泛型工具类', { name: 'Mat', age: 18 } ]
line();

function toArray(x: number): Array<Number> {
  return [x];
}
let x = typeof toArray; // let x: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
debug(Prefix.standard, "12.3 泛型工具类", x); // [ '12.3 泛型工具类', 'function' ]
line();

// keyof
type k1 = keyof Person;
type k2 = keyof Person[];
type k3 = keyof { [x: string]: Person };

// in
type Keys = "a" | "b" | "c";
type Obj = {
  [p in Keys]: any;
};

// infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// extends
interface ILengthwise {
  length: number;
}
function loggingIdentity<T extends ILengthwise>(arg: T): T {
  debug(Prefix.standard, arg.length);
  return arg;
}
loggingIdentity([]);

// Partial
// Partial<T> 作用就是将某个类型里面的属性全部变为可选项?
interface Todo {
  title: string;
  desc: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

debug(Prefix.standard, "<<12-泛型>>", Prefix.end);
