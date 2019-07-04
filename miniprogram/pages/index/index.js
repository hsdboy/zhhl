import * as echarts from '../../ec-canvas/echarts';
const mqtt = require("../../utils/mqtt.js");
const util = require("../../utils/util.js")
//index.js
//获取应用实例
const app = getApp()

function Uint8ArrayToString(fileData) {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString
}
var url = 'wx://101.132.145.97:8000/'; //替换自己的请求地址
var client = mqtt.connect(url, {
  clientId: "clientUserId"
});
var time24
client.on('connect', function() {
  console.log('连接成功');
  //订阅
  wx.getStorage({
    key: 'sn',
    success: function(res) {
      // success
      client.subscribe(res.data.toUpperCase());
      wx.request({
        url: util.url + "/analysis/getStatisticsByTime",
        data: {
          selectTime: new Date().getFullYear() + "-" + Number(new Date().getUTCMonth() + 1) + "-" + new Date().getDate(),
          sn: res.data
        },
        success: res => {

          time24 = res.data.data[0]
        },
      })
    }
  })

})



function hb(canvas, width, height) {
  var hb = []
  client.on('message', function(topic, payload) {
    var newdata = JSON.parse(Uint8ArrayToString(payload))
    hb.push(newdata.hb)
    if (hb.length > 10) {
      hb = hb.slice(-10)
    }
    var option = {
      title: {
        text: `24小时平均值:${time24.avgHb ? time24.avgHb : "--"}次/分`,
        left: 'right',
        textStyle: {
          color: '#37A2DA',
          fontFamily: 'sans-serif',
          fontSize: '12'
        }
      },

      color: ["#37A2DA"],
      grid: {
        top: '30%',
        left: '5%',
        right: '15rpx',
        bottom: '10%',
        containLabel: true,

      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },

      xAxis: { //坐标轴样式
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          }
        }
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        name: "心率曲线",
        splitLine: {
          lineStyle: {
            color: ['rgb(25, 84, 142)'],
            type: 'solid'
          }
        },
        axisLine: { //坐标轴样式
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          },

        },
        axisLabel: { //刻度样式
          textStyle: {
            color: "rgb(249, 249, 249)"
          }
        },
        nameTextStyle: {
          baseline: "bottom",
          color: "rgb(249, 249, 249)"
        },

        // show: false
      },

      series: [{
        name: 'A',
        type: 'line',
        smooth: true,
        data: hb,

      }]
    };
    chart.setOption(option);
  })
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart;
}

function br(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var br = []
  client.on('message', function(topic, payload) {
    const newdata = JSON.parse(Uint8ArrayToString(payload))
    br.push(newdata.br)
    br = br.slice(-10)
    var option = {
      title: {
        text: `24小时平均值:${time24.avgBr ? time24.avgBr:"--"}次/分`,
        left: 'right',
        textStyle: {
          color: '#37A2DA',
          fontFamily: 'sans-serif',
          fontSize: '12'
        }
      },

      color: ["#37A2DA"],
      grid: {
        top: '30%',
        left: '5%',
        right: '15rpx',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },

      xAxis: { //坐标轴样式
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          }
        }
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        name: '呼吸曲线',
        splitLine: {
          lineStyle: {
            color: ['rgb(25, 84, 142)'],
            type: 'solid'
          }
        },
        axisLine: { //坐标轴样式
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          },
        },
        axisLabel: { //刻度样式
          textStyle: {
            color: "rgb(249, 249, 249)"
          }
        },
        nameTextStyle: {
          baseline: "bottom",
          color: "rgb(249, 249, 249)"
        },
        // show: false
      },

      series: [{
        name: 'A',
        type: 'line',
        smooth: true,
        data: br,

      }]
    };
    chart.setOption(option);
  })
  return chart;
}

function sleep(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var st = []
  client.on('message', function(topic, payload) {
    const newdata = JSON.parse(Uint8ArrayToString(payload))
    if (newdata.st == "off") {
      st.push(0)
    } else if (newdata.st == "on") {
      st.push(1)
    } else if (newdata.st == "mov") {
      st.push(2)
    } else if (newdata.st == "call") {
      st.push(3)
    }

    st = st.slice(-10)
    var option = {
      title: {
        text: '睡眠',
        left: 'left',
        textStyle: {
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: '12'
        }
      },

      color: ["#37A2DA"],
      grid: {
        top: '25%',
        left: '5%',
        right: '15rpx',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },

      xAxis: { //坐标轴样式
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: .5
          }
        },
        boundaryGap: true

        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            color: ['rgb(25, 84, 142)'],
            type: 'solid'
          }
        },
        axisLine: { //坐标轴样式
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          },

        },
        axisLabel: { //刻度样式
          textStyle: {
            color: "rgb(249, 249, 249)"
          }
        },
        // show: false
      },

      series: [{
        name: 'A',
        type: 'bar',
        smooth: true,
        data: st,
        barGap: "0%",
        barCategoryGap: "0%"
      }]
    };
    chart.setOption(option);
  })
  return chart;
}

function mov(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var st = []
  client.on('message', function(topic, payload) {
    const newdata = JSON.parse(Uint8ArrayToString(payload))
    if (newdata.st == "off") {
      st.push(0)
    } else if (newdata.st == "on") {
      st.push(1)
    } else if (newdata.st == "mov") {
      st.push(2)
    } else if (newdata.st == "call") {
      st.push(3)
    }

    st = st.slice(-10)
    var option = {
      title: {
        text: '体动',
        left: 'left',
        textStyle: {
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: '12'
        }
      },

      color: ["#37A2DA"],
      grid: {
        top: '25%',
        left: '5%',
        right: '15rpx',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },

      xAxis: { //坐标轴样式
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          }
        },
        boundaryGap: true
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            color: ['rgb(25, 84, 142)'],
            type: 'solid'
          }
        },
        axisLine: { //坐标轴样式
          lineStyle: {
            color: 'rgb(25, 84, 142)',
            width: 1
          },

        },
        axisLabel: { //刻度样式
          textStyle: {
            color: "rgb(249, 249, 249)"
          }
        },

        // show: false
      },

      series: [{
        name: 'A',
        type: 'bar',
        smooth: true,
        data: st,
        barGap: "0%",
        barCategoryGap: "0%"
      }]
    };
    chart.setOption(option);
  })
  return chart;
}



Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hb: {
      onInit: hb
    },
    br: {
      onInit: br
    },
    sleep: {
      onInit: sleep
    },
    mov: {
      onInit: mov
    },
    abnormal: "rgb(36, 221, 94);",
    src: '',
    class: {
      container: "container", user: "usern", userhb: "userhbn", usersm: "usersmn", titlehb: "titlehbn", point: "pointn"
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var that = this
    wx.getStorage({
      key: 'area',
      success: function(res) {
        // success
        console.log(res.data)
        that.setData({
          minhb: res.data.minhb,
          maxhb: res.data.maxhb,
          minbr: res.data.minbr,
          maxbr: res.data.maxbr
        })
      }
    })
    client.on('message', function(topic, payload) {
      var datas = JSON.parse(Uint8ArrayToString(payload))
      that.setData({
        datanow: datas
      })
      if (datas.hb > 0 && datas.hb < that.data.minhb || datas.hb > that.data.maxhb || datas.br > 0 && datas.br < that.data.minbr || datas.br > that.data.maxbr) { //报警范围
        // if (datas.hb==0) { 
        wx.getStorage({
          key: 'warn',
          success: function(res) {
            // success
            if (res.data.indexOf("bibi") != -1) {
              wx.vibrateLong({ //振动
                success: function(res) {
                  that.setData({
                    abnormal: "red"
                  })
                }
              })
            }
            if (res.data.indexOf("ling") != -1) {
              wx.playBackgroundAudio({ //响铃
                dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
                title: '铃声 ',
              })
            }
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'night',
      success: function(res) {
        if (!res.data) {
          that.setData({
              class: {
                container: "containerd", user: "user", userhb: "userhb", usersm: "usersm", titlehb: "titlehb", point: "point"
              }
            }),
            that.tab()
        } else {
          that.setData({
              class: {
                container: "container", user: "usern", userhb: "userhbn", usersm: "usersmn", titlehb: "titlehbn", point: "pointn"
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

  tabn: function() {
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
  abnormal: function() {
    wx.navigateTo({
      url: '../abnormal/abnormal'
    })
  },
  history: function() {
    wx.navigateTo({
      url: '../history/history'
    })
  },

})