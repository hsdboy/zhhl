Page({
  data: {
    minhb: "",
    maxhb: "",
    minbr: "",
    maxbr: "",
    class: {
      title: "titlen", container: "container", input: "inputn"
    },
  },
  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'area',
      success: function(res) {
        // success
        that.setData({
          minhb: res.data.minhb,
          maxhb: res.data.maxhb,
          minbr: res.data.minbr,
          maxbr: res.data.maxbr
        })
      }
    })
  },
  onShow:function(){
    var that=this
    wx.getStorage({
      key: 'night',
      success: function (res) {
        if (!res.data) {
          that.setData({
            class: {
              title: "title", container: "containerd",input:"input"
            },
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
  minhb: function(e) {
    this.setData({
      minhb: e.detail.value
    })
    wx.setStorageSync("area", this.data);
  },
  maxhb: function(e) {
    this.setData({
      maxhb: e.detail.value
    })
    wx.setStorageSync("area", this.data);
  },
  minbr: function(e) {
    this.setData({
      minbr: e.detail.value
    })
    wx.setStorageSync("area", this.data);
  },
  maxbr: function(e) {
    this.setData({
      maxbr: e.detail.value
    })
    wx.setStorageSync("area", this.data);
  },
})