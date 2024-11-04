/* 类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。
换句话说，类型保护可以保证一个字符串是一个字符串。
尽管它的值也可以是一个数值。类型保护与特性检测并不是完全相同，其主要思想
是尝试检测属性，方法或原型，以及确定如何处理掉值。目前主要是有四种的方式
来实现类型保护
 */

import { Prefix, debug } from "@/extra/log";

debug(Prefix.standard, "<< 4-类型守卫 >>", "开始");

// 4.1 in 关键字
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfomation(emp: UnknownEmployee) {
  debug(Prefix.standard, `name: ${emp.name}`);
  if ("privileges" in emp) {
    debug(Prefix.standard, "privileges", emp.privileges);
  }
  if ("startDate" in emp) {
    debug(Prefix.standard, "startDate", emp.startDate);
  }
}
printEmployeeInfomation({
  name: "Admin",
  privileges: ["Add-Something", "Delete-Something"],
});

printEmployeeInfomation({
  name: "Admin",
  startDate: new Date(),
});

// 4.2 typeof 关键字
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "string") {
    return value + padding;
  }
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
debug(Prefix.standard, padLeft("Mat", 10) + "A"); // [ '          MatA' ]
debug(Prefix.standard, padLeft("Mat", "Got")); // [ 'MatGot' ]

// 4.3 instanceof 关键字
interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpace: number) {}
  getPaddingString(): string {
    return Array(this.numSpace + 1).join(" ");
  }
}
class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString(): string {
    return this.value;
  }
}

function printPadder(padder: Padder) {
  if (padder instanceof SpaceRepeatingPadder) {
    debug(Prefix.standard, "padder is space-repeating-padder", `x-- ${padder.getPaddingString()} --x`);
  }
  if (padder instanceof StringPadder) {
    debug(Prefix.standard, "padder is string-padder", padder.getPaddingString());
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);
printPadder(padder);
padder = new StringPadder("padder");
printPadder(padder);

// 4.4 自定义类型保护的类型谓词
function isNumber(x: any): x is number {
  return typeof x === "number";
}
function isString(x: any): x is string {
  return typeof x === "string";
}
debug(Prefix.standard, "<< 4-类型守卫 >>", "结束");
