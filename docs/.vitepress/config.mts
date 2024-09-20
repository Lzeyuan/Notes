import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  head: [["link", { rel: "icon", href: "/Notes/logo.gif" }]],
  title: "Leza笔记",
  description: "A Note Site",
  base: '/',
  themeConfig: {
    logo: "/logo.gif",
    nav: nav(),
    sidebar:
    {
      '/zh/back-end/': { base: '/zh/back-end/', items: sidebarBackEnd() },
      '/zh/devops/': { base: '/zh/devops/', items: sidebarDevOps() }
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024-${new Date().getFullYear()} leza`
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航',
      level: 'deep'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lzeyuan' }
    ]
  }
})
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '后端',
      link: '/zh/back-end/mybatis'
    },
    {
      text: 'DevOps',
      link: '/zh/devops/linux-common'
    }
  ]


}
function sidebarBackEnd(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'MyBatis', link: 'mybatis' },
    { text: 'SpringBoot', link: 'spring-boot/spring-boot' },
    { text: 'SpingSecurity', link: 'sping-security/sping-security' }
  ]

}
function sidebarDevOps(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Linux常用配置', link: 'linux-common' },
    { text: '网络设置', link: 'network' },
    { text: 'Docker', link: 'docker' }
  ]
}