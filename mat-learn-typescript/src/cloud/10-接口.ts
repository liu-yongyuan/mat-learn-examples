import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<10-接口>>", Prefix.start);

// 10.1 对象的形状
interface Person {
  name: string;
  age: number;
}
let mat: Person = {
  name: "Mat",
  age: 27,
};
debug(Prefix.standard, "10.1 对象的形状", mat);
line();
// 10.2 可选|只读属性
interface Man {
  readonly name: string;
  age?: number;
}
/* 只读属性用于限制只能在对象刚刚创建的时候修改其值。
此外还提供了 ReadonlyArray<T> 类型，它与 Array<T> 相似。
只是把所有可变方法去掉了。因此确保数组创建后再也不能修改
 */
let matx: Man = {
  name: "mat",
  age: 27,
};
matx.age = 18; // goback ever
// Cannot assign to 'name' because it is a read-only property.ts(2540)
// matx.name = 'a';
debug(Prefix.standard, "10.2 可选和只读属性", matx);


debug(Prefix.standard, "<<10-接口>>", Prefix.end);
