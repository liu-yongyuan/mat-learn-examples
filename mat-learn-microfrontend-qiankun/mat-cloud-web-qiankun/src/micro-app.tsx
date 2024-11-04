import { ObjectType, RegistrableApp, registerMicroApps, start } from 'qiankun';

const microAppList = [
  {
    name: 'mat-cloud-qiankun-react',
    entry: 'http://localhost:3000/',
    activeRule: '/mat-cloud-qiankun-react',
    container: '#mat-cloud-web-qiankun',
  },
  {
    name: 'mat-cloud-qiankun-vuejs',
    entry: 'http://localhost:3010/',
    activeRule: '/mat-cloud-qiankun-vuejs',
    container: '#mat-cloud-web-qiankun', //  同一个容器,进行覆盖
  },
] as RegistrableApp<ObjectType>[];

/**
 * 应用名称列表
 * @returns
 */
export const microAppNameList: string[] = Array.from(new Set(microAppList.map((item) => item.name)));

/**
 * 微应用注册
 */
export function microAppInit(): void {
  return registerMicroApps(microAppList);
}

/**
 * 微应用启动
 */
export function microAppStart(): void {
  // 启动乾坤
  return start({
    prefetch: true, // 取消预加载
    sandbox: {
      // 样式隔离特性
      experimentalStyleIsolation: true,
    },
  });
}
