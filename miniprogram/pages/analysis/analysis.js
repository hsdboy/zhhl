const util = require("../../utils/util.js")
const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月获取当月的总天数
let getDays = function(year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function(year, month, day, _this) {
  let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
  day = day > daysNum ? 1 : day
  let monthsNum = year === nowYear ? nowMonth : 12
  let years = []
  let months = []
  let days = []
  let yearIndex = 9999
  let monthIndex = 0
  let dayIndex = 0
  // 重新设置年份列表
  for (let i = 1990; i <= nowYear; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIndex = idx
    }
  })
  // 重新设置月份列表
  for (let i = 1; i <= monthsNum; i++) {
    var k = i;
    months.push(k)
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIndex = idx
    }
  })
  // 重新设置日期列表
  for (let i = 1; i <= daysNum; i++) {
    var k = i;
    days.push(k)
  }
  days.map((v, idx) => {
    if (v === day) {
      dayIndex = idx
    }
  })
  _this.setData({
    //时间列表参数
    years: years,
    months: months,
    days: days,
    //选中的日期
    year: year,
    month: month,
    day: day,
    value: [yearIndex, monthIndex, dayIndex],
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: [],
    months: [],
    days: [],
    //选中的日期
    year: nowYear,
    month: nowMonth,
    day: nowDay,
    value: [9999, 1, 1],
    datas: [],
    date: new Date().getFullYear() + "-" + Number(new Date().getUTCMonth() + 1) + "-" + new Date().getDate(),
    isShowDates: false,
    sn: "无设备",
    class: {
      analysis: "analysisn", equipment: "equipmentn", data: "datan", title: "titlen"
    }
  },
  onLoad: function() {

  },
  onShow: function() {
    var that = this;
    setDate(this.data.year, this.data.month, this.data.day, this);
    wx.getStorage({
      key: 'sn',
      success: function(res) {
        // success
        that.setData({
          sn: res.data
        })

        wx.request({
          url: util.url + "/analysis/getStatisticsByTime",
          data: {
            selectTime: that.data.date,
            sn: that.data.sn
          },
          success: res => {
            that.setData({
              datas: res.data.data[0],
            })
          },
        })
      }
    })

    wx.getStorage({
      key: 'night',
      success: function(res) {
        if (!res.data) {
          that.setData({
              class: {
                analysis: "analysis", equipment: "equipment", data: "data", title: "title"
              }
            }),
            that.tab()
        }else{
          that.setData({
            class: {
              analysis: "analysisn", equipment: "equipmentn", data: "datan", title: "titlen"
            }
          }),
          that.tabn()
        }
      }
    })
  },

  tab: function() {
    wx.setNavigationBarColor({
        frontColor: '#000000', // 必写项
        backgroundColor: "white", // 传递的颜色值
        color: "black",
        animation: { // 可选项
          duration: 400,
          timingFunc: 'easeIn'
        }
      }),
      wx.setTabBarStyle({
        color: '#777777',
        selectedColor: '#ffffff',
        backgroundColor: '#aedafd',
        borderStyle: 'white'
      });

  },

  tabn: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: "#02203c", // 传递的颜色值
      color: "black",
      animation: { // 可选项
        duration: 400,
        timingFunc: 'easeIn'
      }
    }),
      wx.setTabBarStyle({
      "color": "#6c88a0",
      "selectedColor": "#fff",
      "borderStyle": "black",
      "backgroundColor": "#002848",
      });

  },
  choose: function() {
    this.setData({
      isShowDates: true
    })
  },
  bindChange: function(e) {
    let val = e.detail.value
    setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)
    console.log(this.data)
  },
  confirm: function() {
    let val = this.data.value
    var date = this.data.years[val[0]] + "-" + this.data.months[val[1]] + "-" + this.data.days[val[2]]
    this.setData({
      date: date
    })
    this.onShow()
    this.setData({
      isShowDates: false
    })
  },
  cancel: function() {
    this.setData({
      isShowDates: false
    })
  },
})