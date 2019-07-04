//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    class: { item: "log-itemn", container: "container" },
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'night',
      success: function (res) {
        if (!res.data) {
          that.setData({
            class: { item: "log-item", container: "containerd"},
          }),
            that.tab()
        }
      }
    })
  },
  tab: function () {
    wx.setNavigationBarColor({
      frontColor: '#000000', // 必写项
      backgroundColor: "white", // 传递的颜色值
      color: "black",
      animation: { // 可选项
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
})
