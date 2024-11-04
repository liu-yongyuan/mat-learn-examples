// 5.1 联合类型

import { Prefix, debug } from "@/extra/log";

debug(Prefix.standard, "[5-联合类型和类型别名]", "开始");

// 联合类型通常和 null 或 undefined 一起使用。
const sayHello = (name: string | undefined) => {};
sayHello("Mat");
sayHello(undefined);

// 5.2 可辨识联合
/* 这种类型的本质是结合联合类型和字面量类型的一种类型保护方法。
如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性
来创建不同的类型保护区块。
 */

// 1. 可辨识度
enum CarTransmission {
  Automatic = 200,
  Manual = 300,
}
interface Motorcycle {
  vType: "motorcycle"; // discriminant
  make: number; // year
}
interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission;
}
interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}

// 2. 联合类型
type Vehicle = Motorcycle | Car | Truck;

// 3. 类型守卫
const EVALUATION_FACTOR = Math.PI;
function evaluationPrice(vehicle: Vehicle) {
  /* return vehicle.capacity * EVALUATION_FACTOR; 
  以上代码 TypeScript 编译器会提示错误信息。
  Property 'capacity' does not exist on type 'Vehicle'.
  Property 'capacity' does not exist on type 'Motorcycle'.ts(2339)
  */
  switch (vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
const myTruck: Truck = { vType: "truck", capacity: 9.5 };
debug(Prefix.standard, myTruck, evaluationPrice(myTruck));

// 5.3 类型别名
type Message = string | string[];
let greet = (message: Message) => {
  return message.length;
};
debug(Prefix.standard, "x", greet("x"));

debug(Prefix.standard, "[5-联合类型和类型别名]", "结束");
