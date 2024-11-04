import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { microAppInit, microAppStart } from './micro-app';
import router from './router/micro-router';
/**
 * 主体函数
 */
function render() {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`BASE_ENV=${process.env.BASE_ENV}`);

  const rootContainer = document.getElementById('root')!;
  const root = createRoot(rootContainer);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
  );
}
// 渲染主体
render();

// 注册微应用
microAppInit();
microAppStart();
