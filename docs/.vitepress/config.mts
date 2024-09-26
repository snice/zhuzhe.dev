import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "朱哲大前端开发",
  description: "朱哲大前端开发 | 轻松+持续学习大前端",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      {
        text: '工具', items: [
          {
            text: 'uni-app插件package.json生成',
            link: '/tools/uni-plugin-pkg'
          },
          {
            text: 'uni-app(x)离线打包工具辅助',
            link: '/tools/uni-pkg-cli'
          }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          {
            text: '我的工具', items: [
              {
                text: 'uni-app插件package.json生成',
                link: '/tools/uni-plugin-pkg'
              },
              {
                text: 'uni-app(x)离线打包工具辅助',
                link: '/tools/uni-pkg-cli'
              }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
