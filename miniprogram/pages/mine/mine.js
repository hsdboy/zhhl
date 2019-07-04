const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenmodalput: true,
    class: { view: "viewn", right: "rightn", container: "container", userinfo: "userinfo-nicknamen" },
    checke:true
  },
  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'sn',
      success: function(res) {
        // success
        that.setData({
          showsn: res.data
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
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'night',
      success: function (res) {
        if (!res.data) {
          that.setData({
            class: { view: "view", right: "right", container: "containerd", userinfo:"userinfo-nickname" },
            checke:false
          }),
            that.tab()
      
        }else{
          that.setData({
            class: { view: "viewn", right: "rightn", container: "container", userinfo: "userinfo-nicknamen" },
            checke: true
          }),
            that.tabn()
  
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
  changsn: function() {
    this.setData({
      hiddenmodalput: false
    })
  },
  sn: function(e) {
    this.setData({
      sn: e.detail.value
    })
  },
  password: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  cancelM: function(e) {
    this.setData({
      hiddenmodalput: true,
    })
  },
  confirmM: function(e) {
      wx.setStorageSync("sn", this.data.sn);
      this.setData({
        showsn: this.data.sn,
        password: ""
      })
      wx.showToast({
        title: '设备更换成功'
      })
 
    
    this.cancelM();
  },
  warn: function() {
    wx.navigateTo({
      url: '../warn/warn',
    })
  },
  warnarea: function() {
    wx.navigateTo({
      url: '../warnarea/warnarea',
    })
  },
  count: function() {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  family: function() {
    wx.navigateTo({
      url: '../family/family',
    })
  },
  addfamily: function() {
    wx.navigateTo({
      url: '../addfamily/addfamily',
    })
  },
  times: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  switch1Change: function(e) {
    wx.setStorageSync("night", e.detail.value)
    if (!e.detail.value) {
      this.setData({
        class: { view: "view", right: "right", container: "containerd", userinfo: "userinfo-nickname" },
      }),
        this.tab()
    } else {
      this.setData({
        class: { view: "viewn", right: "rightn", container: "container", userinfo: "userinfo-nicknamen" },
      }),
        this.tabn()
    }
  }
})