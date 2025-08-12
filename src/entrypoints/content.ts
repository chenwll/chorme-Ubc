import ReactDOM from 'react-dom/client';
import Index from "@/Index";
import React from 'react';

export default defineContentScript({
  // 匹配规则，自动执行脚本逻辑
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    console.log('content script loaded cwl');
    const ui = await createShadowRootUi(ctx, {
      name: 'jiankang-ubc',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Container is a body, and React warns when creating a root on the body, so create a wrapper div
        const wrapper = document.createElement('div');
        container.append(wrapper);

        // 在 UI 容器上创建 React 根节点并渲染组件
        const root = ReactDOM.createRoot(wrapper);
        root.render(React.createElement(Index));
        return root;
      },
      onRemove: (root) => {
        // UI 被移除时卸载 React 根节点
        root?.unmount();
        root?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
