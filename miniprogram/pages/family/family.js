const APP_ID = 'wx741102b673f157f1'; //输入小程序appid
const APP_SECRET = 'f2d752dcce8e7ef683f148c35837ad28'; //输入小程序app_secret
var OPEN_ID = '' //储存获取到openid
var SESSION_KEY = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: '',
    content: '',
    id: '',
    hiddenmodalput: true,
    out: false,
    class: {
      body: "bodyn", title: "titlen", item: "itemn"
    }
  },
  onShow: function() {
    var that = this;
    wx.cloud.init()
    const db = wx.cloud.database()
    wx.login({
      success: function(res) {
        wx.request({
          //获取openid接口
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function(res) {
            that.setData({
              openid: res.data.openid
            })
            db.collection('family').where({
              _openid: res.data.openid
            }).get({
              success: res => {
                that.setData({
                  datas: res.data,
                })
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
              }
            })

          }
        })
      }
    })
    wx.getStorage({
      key: 'night',
      success: function (res) {
        if (!res.data) {
          that.setData({
            class: {
              body: "body", title: "title", item: "item"
            }
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
  get: function(item) {
    return item._id == this.data.id
  },
  choose: function(e) {
    // console.log(e)
    this.setData({
      id: e.currentTarget.dataset.id //1.让data.id=鼠标选中id
    })
    var name = this.data.datas.find(this.get).name
    var phone = this.data.datas.find(this.get).phone
    var data = JSON.stringify(this.data.datas.find(this.get)) //2.get方法获取对应id的对象
    var that = this
    wx.showActionSheet({
      itemList: ['查看详情', '呼叫'],
      success: function(res) {
        // console.log(data)
        if (res.tapIndex == 0) { //详情
          wx.navigateTo({
            url: '../addfamily/addfamily?data=' + data,
            success: function(res) {
              // success
            },
          })
        } else if (res.tapIndex == 1) { //呼叫    
          wx.makePhoneCall({
            phoneNumber: phone,
          })
        }
      },
    })
  },

  add: function() {
    wx.navigateTo({
      url: '../addfamily/addfamily',
      success: function(res) {
        // success
      },
    })
  },
  search: function(e) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('family').where({
      name: {
        $regex: '.*' + e.detail.value,
        $options: 'i'
      },
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          datas: res.data,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
})