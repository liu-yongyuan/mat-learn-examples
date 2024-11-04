import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<9-对象>>", Prefix.start);

// 9.1 对象解构
let person = {
  name: "Mat",
  gender: "Man",
};
let { name, gender } = person;
debug(Prefix.standard, "9.1 对象解构", name, gender); // [ '9.1 对象解构', 'Mat', 'Man' ]

// 9.2 对象展开运算符
let personal = {
  name: "Mat",
  gender: "Man",
  address: "Guangzhou",
};
// 组装对象
let personWithAge = { ...personal, age: 33 };

// 获取除了某些项外的其它项
let { name: userName, ...reset } = person;

debug(Prefix.standard, "<<9-对象>>", Prefix.end);
