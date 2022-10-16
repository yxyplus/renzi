import defaultSettings from '@/settings'

// 动态标签页 标题
const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
