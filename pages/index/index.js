//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerData: [
                  {
                      src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1410699069,2629528698&fm=26&gp=0.jpg',
                      id: 0
                  },
                  {
                      src: 'http://img.tupianzj.com/uploads/allimg/160810/9-160Q0161301.jpg',
                      id: 1
                  },
                  {
                      src: 'http://image2.cnpp.cn/upload/images/20180725/17473224963_1170x700.jpg',
                      id: 2
                  }
              ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(app.globalData.userInfo)
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  swiperChange(e) {
    const that = this;
   console.log(e);
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  goLogin:function(){
    console.log("点击登录了")
    wx.switchTab({
      url: '../login/login',
    })
  }
})
