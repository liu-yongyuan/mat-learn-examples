import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './pages/app/app';

let root: Root | null = null;
function render(props: { container: Element }) {
  // 访问当前项目 index.html 的 root 节点
  root = createRoot(props.container.querySelector('#micro-react-qiankun')!);
  root.render(<App />);
}

export async function bootstrap(props: Record<string, any>) {
  console.log('[mat-cloud-qiankun-react:bootstrap]', props);
}

export async function mount(props: { container: Element }) {
  console.log('[mat-cloud-qiankun-react:mount]', props);
  render(props);
}

export async function unmount(props: Record<string, any>) {
  console.log('[mat-cloud-qiankun-react:unmount]', props);
  if (!root) {
    return;
  }
  root.unmount();
  root = null;
}
