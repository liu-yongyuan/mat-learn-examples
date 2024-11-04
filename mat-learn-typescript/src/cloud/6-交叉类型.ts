import { Prefix, debug } from "@/extra/log";

debug(Prefix.standard, "<<6-交叉类型>>", "开始");

interface IPerson {
  id: string;
  age: number;
}
interface IWorker {
  companyId: string;
}
/* 通过 & 运算符定义了 IStaff 交叉类型。
该类型同时拥有 IPerson 和 IWorker 这两种类型的成员。 */
type IStaff = IPerson & IWorker;
const staff: IStaff = {
  id: "E1006",
  age: 33,
  companyId: "EFI",
};
debug(Prefix.standard, staff); // [ { id: 'E1006', age: 33, companyId: 'EFI' } ]

debug(Prefix.standard, "<<6-交叉类型>>", "结束");
