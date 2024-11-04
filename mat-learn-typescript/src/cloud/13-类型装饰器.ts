import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<13-类型装饰器>>", Prefix.start);

/* 
13.1 装饰器是什么
它是一个表达式
该表达式被执行后，返回一个函数
函数的入参分别为 target、name 和 descriptor
执行该函数后，可能返回 descriptor 对象，用于配置 target 对象

13.2 装饰器的分类
类装饰器（Class decorators）
属性装饰器（Property decorators）
方法装饰器（Method decorators）
参数装饰器（Parameter decorators）
 */

// 13.3 类装饰器
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// target: TFunction - 被装饰的类

// 示例
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    debug(Prefix.standard, "13.3 类装饰器", "greet");
  };
}

@Greeter
class Greeting {
  constructor() {}
}

let myGreeting = new Greeting();
(myGreeting as any).greet(); // [ '13.3 类装饰器', 'greet' ]

function GreeterS(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      debug(Prefix.standard, "13.3 类装饰器", "greet", greeting);
    };
  };
}
@GreeterS("Hello TS!")
class GreetingS {}
let greets = new GreetingS();
(greets as any).greet(); // [ '13.3 类装饰器', 'greet', 'Hello TS!' ]
line();

// 13.4 属性装饰器
/* 
属性装饰器顾名思义，用来装饰类的属性。它接收两个参数：

target: Object - 被装饰的类
propertyKey: string | symbol - 被装饰类的属性名
 */
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
const section_title_13_4 = "13.4 属性装饰器";
function logProperty(target: any, key: string) {
  debug(Prefix.standard, section_title_13_4, `设置属性`, target, key, target[key]);
  delete target[key];

  debug(Prefix.standard, section_title_13_4, `移除属性`, target[key]);

  // 设定替代的属性
  const backingField = `_${key}`;
  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  // 访问器属性  get
  // 不能生效
  const getter = function (this: any) {
    const currVal = this[backingField];
    debug(Prefix.standard, section_title_13_4, `Get：${key} => ${currVal}`);
    return currVal;
  };

  // 访问器属性 set
  // 不能生效
  const setter = function (this: any, newValue: any) {
    debug(Prefix.standard, section_title_13_4, `Set：${key} => ${newValue}`);
    this[backingField] = newValue;
  };

  // 设定原有属性的映射到定义好的访问器属性中
  // 不能生效
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
const person1 = new Person("Mat"); // 不能生效
person1.name = "Mat-ERK"; // 不能生效

// 13.5 方法装饰器
function LogOutput(target: Function, key: string | symbol, descriptor: any) {
  let originalMethod = descriptor.value;
  let newMethod = function (this: any, ...args: any[]): any {
    let result: any = originalMethod.apply(this, args);
    if (!this.loggedOutput) {
      this.loggedOutput = new Array<any>();
    }
    this.loggedOutput.push({
      method: key,
      parameters: args,
      output: result,
      timestamp: Date.now(),
    });
    return result;
  };
  descriptor.value = newMethod;
}
class Calculator {
  // @LogOutput 有问题
  double(num: number): number {
    return num * 2;
  }
}
let calc = new Calculator();
calc.double(11);
debug(Prefix.standard, "13.5 方法装饰器", (calc as any).loggedOutput);
line();

// 13.6 参数装饰器
function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  debug(Prefix.standard, "13.6 参数装饰器", `The parameter in position ${parameterIndex} at ${functionLogged} has been decorated`);
}

class GreeterH {
  greeting: string;
  // 报错，不支持
  // constructor(@Log phrase: string) {
  //   this.greeting = phrase;
  // }
}

debug(Prefix.standard, "<<13-类型装饰器>>", Prefix.end);
