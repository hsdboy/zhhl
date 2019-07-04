const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    ji1: "",
    ji2: "",
    ji0: "jiln",
    date: new Date().getFullYear() + "-" + Number(new Date().getUTCMonth() + 1) + "-" + new Date().getDate(),
    dates: [],
    class: { body: "bodyn", jilu: "jilun", content: "contentn",jil:"jiln" }
  },
  onLoad: function() {
    this.week()
  },
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'night',
      success: function (res) {
        if (!res.data) {
          that.setData({
            class: { body: "body", jilu: "jilu", content: "content", jil: "jil" },
            ji0:"jil"
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
  getDate: function(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() - AddDayCount);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    return y + '-' + m + '-' + d;
  },
  week: function() {
    this.getdata(7)
    this.setData({
      ji1: "",
      ji2: "",
      ji0: this.data.class.jil,
    })
  },

  ten: function() {
    this.getdata(10)
    this.setData({
      ji1: this.data.class.jil,
      ji2: "",
      ji0: "",
    })
  },

  month: function() {
    this.getdata(30)
    this.setData({
      ji1: "",
      ji2: this.data.class.jil,
      ji0: "",
    })

  },
  getdata: function(day) {
    var data = []
    for (let i = 0; i < day; i++) {
      wx.request({
        url: util.url + "/analysis/getStatisticsByTime",
        data: {
          selectTime: this.getDate(i),
          sn: "Z56552"
        },
        success: res => {
          data[i] = {
            date: this.getDate(i),
            data: res.data.data[0]
          }
          this.setData({
            data
          })
        },
      })

    }
  }
})