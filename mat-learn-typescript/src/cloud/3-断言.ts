/* 会比 typescript 更清楚某个值的详细信息。 */

import { Prefix, debug } from "@/extra/log";

// 1-尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
debug(Prefix.standard, strLength);

// 2. as 语法
strLength = (someValue as string).length;
debug(Prefix.standard, strLength);
