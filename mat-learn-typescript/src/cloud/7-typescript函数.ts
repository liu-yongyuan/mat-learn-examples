import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<7-typescript函数>>", Prefix.start);

// 7.2 箭头函数
let myBooks = [
  {
    title: "Cloud 1",
  },
  {
    title: "Cloud 2",
  },
];
myBooks.forEach(() => debug(Prefix.standard, "reading"));
line();
myBooks.forEach((title) => debug(Prefix.standard, title));
line();
myBooks.forEach(({ title }, idx, arr) => debug(Prefix.standard, `${idx} - ${title}`));
line();
myBooks.forEach(({ title }, idx, arr) => debug(Prefix.standard, `${idx} - ${title}`));
line();

// 箭头函数的方法使用
function BookSimple() {
  setTimeout(function () {
    debug(Prefix.standard, BookSimple.name);
  }, 30);
}
BookSimple();
function BookArrow() {
  setTimeout(() => {
    debug(Prefix.standard, BookArrow.name);
  }, 30);
}
BookArrow();
line();

// 7.3 参数类型和返回类型
function createUserId(name: string, id: number): string {
  return name + id;
}

// 7.4 函数类型
let IdGenerator: (chars: string, nums: number) => string;
IdGenerator = createUserId;

// 7.5 可选参数及默认参数
function createUserId2(name: string = "Mat", id: number, age?: number): string {
  return name + id;
}

// 7.6 剩余参数
function push(array: number[], ...items: number[]) {
  items.forEach((x) => array.push(x));
}
let a: number[] = [];
push(a, 1, 2, 3, 4);
debug(Prefix.standard, a); // => [ [ 1, 2, 3, 4 ] ]

// 7.7 函数重载
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
/* 报错，提示缺乏实现
function add(a: number, b: string): number {
  return parseInt(b) + a;
} */
/* 可以，实现了所有的类型，检查了所有类型 */
function add(a: number | string, b: number | string) {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
}

class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number | string, b: number | string) {
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    } else if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
  }
}
const calculator = new Calculator();
debug(Prefix.standard, calculator.add(10, 20)); // 30

debug(Prefix.standard, "<<7-typescript函数>>", Prefix.end);
