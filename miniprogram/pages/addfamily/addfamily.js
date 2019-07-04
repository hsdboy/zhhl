Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    button: "确认新增",
    state: '0',
    class:{body:"bodyn",content:"contentn",right:"rightn"}
  },
  onLoad: function (options) {
    if (options.data !== undefined) {
      var data = JSON.parse(options.data)
      this.setData({
        datas: data,
        button: "修改",
        state: '1'
      })
    }
    // console.log(this.data.datas)
  },
  onShow(){
    var that = this;
    wx.getStorage({
      key: 'night',
      success: function (res) {
        if (!res.data) {
          that.setData({
            class: { body: "body", content: "content", right: "right" }
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

  addfamily: function (e) {

    var id = e.detail.value._id;
    var data = {
      name: e.detail.value.name,
      phone: e.detail.value.phone,
      address: e.detail.value.address,
    }
    if (this.data.state == 1) {
      const db = wx.cloud.database()
      db.collection('family').doc(id).update({//根据id修改
        data: data,
        success: res => {
          wx.showToast({
            title: '修改记录成功',
          })
          console.log('[数据库] [修改记录] 成功，记录 _id: ', res._id)

        },
        fail: err => {
          icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err)
        }
      })
    } else {


      if (e.detail.value.name) { //添加新监护
        const db = wx.cloud.database()
        db.collection('family').add({
          data: data,
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            wx.showToast({
              title: '新增记录成功',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '请输入监护人姓名'
        })
      }
    }
  }
})