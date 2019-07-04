const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    page: 1,
    class: { item: "item", container: "container" }
  },
  onLoad: function() {
    this.getdata()
  },
  onShow() {
    var that = this;
    wx.getStorage({
      key: 'night',
      success: function(res) {
        if (!res.data) {
          that.setData({
              class: {item:"itemn",container:"containerd"}
            }),
         that.tab()
        }
      }
    })
  },
  onReachBottom() {
    const page = this.data.page + 1
    this.setData({
      page
    })
    this.getdata()
  },
  getdata: function() {
    wx.request({
      url: util.url + "/abnormal/getAbnormalList",
      data: {
        pageIndex: this.data.page,
        pageSize: 10
      },
      success: res => {

        this.setData({
          data: this.data.data.concat(res.data.data)
        })
      },
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
  }
})