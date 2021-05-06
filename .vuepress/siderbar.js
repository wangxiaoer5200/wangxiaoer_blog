const { createSideBarConfig } = require('./util')
const JAVASCRIPT_PATH = '/blogs/javascript'
const CSS_PATH = '/blogs/css'
const PERFORM_PATH = '/blogs/perform'


module.exports = {
  [JAVASCRIPT_PATH]: [
    [createSideBarConfig('JS基础', JAVASCRIPT_PATH)]
  ],
  [CSS_PATH]: [createSideBarConfig('CSS基础', CSS_PATH)],
  [PERFORM_PATH]: [createSideBarConfig('前端性能相关', PERFORM_PATH)],
}
