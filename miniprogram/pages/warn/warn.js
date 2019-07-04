Page({
  data: {
    items: [{
        name: 'ling',
        value: '响铃',
        checked: ''
      },
      {
        name: 'bibi',
        value: '振动',
        checked: ''
      },
    ],
    class: {
      checkbox: "checkboxn", container: "container"
    },
  },
  onShow: function() {
    var items = this.data.items
    var that = this
    wx.getStorage({
      key: 'warn',
      success: function(res) {
        // success

        if (res.data.indexOf("ling") != -1) {
          items.filter(function(item) {
            return item.name == "ling";
          })[0].checked = "true"
        }
        if (res.data.indexOf("bibi") != -1) {
          items.filter(function(item) {
            return item.name == "bibi";
          })[0].checked = "true"
        }
        that.setData({
          items: items
        })
      }
    })
    wx.getStorage({
      key: 'night',
      success: function(res) {
        if (!res.data) {
          that.setData({
              class: {
                checkbox: "checkbox", container: "containerd"
              },
            }),
            that.tab()
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
    })
  },
  checkboxChange: function(e) {
    wx.setStorageSync("warn", e.detail.value);
  }
})