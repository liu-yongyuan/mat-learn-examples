import { debug, Prefix } from "@/extra/log";

// Boolean 类型
let isDone: Boolean = false;

// 数值类型
let count: Number = 10;

// 字符类型
let name: String = "mat";

// 数组类型
let list: number[] = [1, 2, 3, 4];
let listx: Array<number> = [2, 2, 3, 4];

// 输出
debug(Prefix.standard, isDone, count, list, listx);

// enum 类型
/* 
数值类型
{
    '0': 'NORTH',
    '1': 'SOUTH',
    '3': 'EAST',
    '4': 'WEST',
    NORTH: 0,
    SOUTH: 1,
    EAST: 3,
    WEST: 4
  },
 */
enum Direction {
  NORTH, // 默认为 0
  SOUTH, // 默认为 1
  EAST = 3, // 默认为 2, 这利设置为 3
  WEST, // 默认为 3， 上面的使用了 3，这里会默认为 4
}
let dir: Direction = Direction.NORTH;
debug(Prefix.standard, Direction, dir);

/* 异构枚举值
 [ { '0': 'A', '1': 'B', '8': 'E', A: 0, B: 1, C: 'C', D: 'D', E: 8 } ]
 */
enum Heterogeneous {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
}
debug(Prefix.standard, Heterogeneous);

// Any 类型
/* 
Any 类型本质上是类型系统的逃逸舱，允许对 any 类型的值执行任何操作，而无需做任何的检查。
[standard]  ---  [ 666 ]
[standard]  ---  [ 'Mat' ]
[standard]  ---  [ false ]
 */
let notSure: any = 666;
debug(Prefix.standard, notSure);
notSure = "Mat";
debug(Prefix.standard, notSure);
notSure = false;
debug(Prefix.standard, notSure);

/* 2.7 unknown */
let value: unknown;
// 原始类型
value = true; // boolean
value = 42; // number
value = "Hello World!"; // string
value = BigInt(1); // bigint
value = Symbol("key-in-life"); // symbol
value = undefined; // undefined
value = null; // null
// 引用类型
value = {}; // object

// 基于引用类型的对象
value = []; // array
value = Math.random(); // number
value = new TypeError(); // Error

let valuex: unknown;
let value1: unknown = valuex;
let value2: any = valuex;
debug(Prefix.standard, valuex, value1, value2); //[ undefined, undefined, undefined ]
/* 
以下方式都会报错
let value3:boolean = valuex;
let value4:number = valuex;
let value5:string = valuex;
let value6:BigInt = valuex;
let value7:Symbol = valuex;
let value8:undefined = valuex;
let value9:null = valuex;

unknown 类型只能赋值给 any 类型和 unknown 类型本身。
这是有道理的，只有保存任意类型的值的类型才能保存 unknown。
 */

debug(Prefix.standard);

let data: unknown;
/* 以下方式都会报错 */
/* 
变量设置为 unknown 后，以下操作都被禁止。
data.foo.bar();
data.trim();
data();
new data();
data[0][1]; */

/* 
Argument of type 'unknown' is not assignable to parameter of type 'symbol'.
data = Symbol(1);
Symbol.keyFor(data); */

// 2.8 Tuple 类型
/* 元组，Typescript 特有的类型，类似于数组
元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。
使用元组时，必须提供每个属性的值。
 */
let tupleType: [string, boolean];
tupleType = ["Mat", true];
debug(Prefix.standard, tupleType[0], tupleType[1]); // [ 'Mat', true ]

/* 
typescript 都会报错
tupleType = ["Mat"];
tupleType = [];
tupleType = ["Mat", "A"];
tupleType = [true, "Mat"]
 */

// 2.9 Void
let voix: void;
voix = undefined;
debug(Prefix.standard, voix); // [ undefined ]
// voix = 1; void 代表没有返回值，没有类型。自然不能再赋值和操作。函数默认返回 void

// 2.10  Null 和 undefined
/* 默认情况下 null 和 undefined 是所有类型的子类型。
可以把这两个类型赋值给 number 类型。如果指定了 --strictNullChecks 标记，null 和 undefined
就只能赋值给 void 和它们各自的类型 */
let u: undefined = undefined;
let n: null = null;
let valueU = u;
let valueN = n;
debug(Prefix.standard, valueU, valueN); // [ undefined, null ]

// 2.11 Never 类型
/* never 类型表示的永不存在的类型。never类型是那些总是会抛出异常或根本就不会有返回值的
函数表达式或箭头函数表达式的返回值类型。 */
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}

/* typescript 利用 never 类型的特性来实现全面性检查
在 else 分支里面，把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。
如果这里后面再增加类型 boolean，但是忘记改了函数，就会产生一个编译报错。
此时就可以确保穷尽了 Foo 的所有可能类型。
使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码
 */
// type Foo = string | number | boolean; // error TS2322: Type 'boolean' is not assignable to type 'never'.
type Foo = string | number;
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    const check: never = foo; // error TS2322: Type 'boolean' is not assignable to type 'never'
  }
}
debug(Prefix.standard, controlFlowAnalysisWithNever('x'));