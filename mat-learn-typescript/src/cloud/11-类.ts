import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<11-类>>", Prefix.start);

// 11.1 类的属性与方法
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return `Class name is ${this.cname}`;
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}
let greeter = new Greeter("World");
debug(Prefix.standard, "11.1 类的属性和方法", greeter.greet(), Greeter.getClassName()); // [ '11.1 类的属性和方法', 'Hello, World', 'Class name is Greeter' ]
line();

// 11.2 访问器
let passcode = "Hello Typescript";
class Employee {
  /* Property '_fullName' has no initializer and is not definitely assigned in the constructor.ts(2564)
  tsconfig.json > compilerOptions
     "strictPropertyInitialization": false,   // 避免属性的初始化
   */
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    this._fullName = newName;
  }
}
let employee = new Employee();
employee.fullName = "Mat";
debug(Prefix.standard, "11.2 访问器", employee); // [ '11.2 访问器', Employee { _fullName: 'Mat' } ]
line();

// 11.3 类的继承
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  move(distanceInMetes: number = 0) {
    debug(Prefix.standard, `${this.name} moved ${distanceInMetes}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMetes: number = 5): void {
    debug(Prefix.standard, "snake slithering...");
    super.move(distanceInMetes);
  }
}
let sam = new Snake("sammy the Python");
sam.move();
line();

// 11.4 ECMAScript 私有字段
class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    debug(Prefix.standard, `Hello, my name is ${this.#name}!`);
  }
}
let mat = new Person('Mat');
mat.greet();
line();

debug(Prefix.standard, "<<11-类>>", Prefix.end);
