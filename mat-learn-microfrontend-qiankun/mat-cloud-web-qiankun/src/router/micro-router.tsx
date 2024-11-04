import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/app/app';
import Empty from '../pages/empty/empty';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/mat-cloud-qiankun-react/*',
        element: <Empty />,
      },
      {
        path: '/mat-cloud-qiankun-vuejs/*',
        element: <Empty />,
      },
    ],
  },
]);

export default router;
