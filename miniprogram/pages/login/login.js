const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    // 查看是否授权
    if (app.globalData.userInfo) {
      wx.switchTab({
        url: '../index/index'
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.switchTab({
          url: '../index/index'
        })

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.switchTab({
            url: '../index/index'
          })

        }
      })
    }

  },
  bindGetUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      //用户按了拒绝按钮
        
    }
  }
      
})