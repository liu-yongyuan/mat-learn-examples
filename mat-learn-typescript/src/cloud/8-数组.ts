import { Prefix, debug, line } from "@/extra/log";

debug(Prefix.standard, "<<8-typescript数组>>", Prefix.start);

// 8.1 数组解构
let x: number;
let y: number;
let z: number;
let five_array = [0, 1, 2, 3, 4];
[x, y, z] = five_array;
debug(Prefix.standard, "8.1 数组解构", x, y, z); // [ '8.1 数组解构', 0, 1, 2 ]

// 8.2 数组展开运算符
let two_array = [0, 1];
five_array = [...two_array, 2, 3, 4];
debug(Prefix.standard, "8.2 数组展开运算符", five_array); //  [ '8.2 数组展开运算符', [ 0, 1, 2, 3, 4 ] ]

// 8.3 数组遍历
let colors: string[] = ["red", "green", "blue"];
debug(Prefix.standard, "8.3 数组遍历", colors); // [ '8.3 数组遍历', [ 'red', 'green', 'blue' ] ]


debug(Prefix.standard, "<<8-typescript数组>>", Prefix.end);
