import { config } from './utils/config'

const baseUrl = config.formal.server;
const api = config.project + '/api-wx';
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  setLocalStorage(key,val){
    try {
        wx.setStorageSync(key, val)
    } catch (e) {    
    }
  },
  getLocalStorage(key){
    try {
      var value = wx.getStorageSync(key)
      if (value) {
          // Do something with return value
          return value;
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  login(userinfo,callback){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        var code = res.code;
         
        console.log("code: "+code);
        // this.globalData.userInfo = userinfo.userInfo;
        // this.setLocalStorage('userInfo',userinfo.userInfo);
        // var encrypted_data = userinfo.encryptedData;
        // var iv = userinfo.iv;
        let url = baseUrl + api + '/user/doLogin';
       console.log(url);
      // console.log(userinfo);
        wx.request({
          url: url,
          data: {
            userName:userinfo.username,
            pwd:userinfo.password
          },
          header: { 'content-type': 'application/json' },
          method: "POST",
          success: function(res) {
            // 收到https服务成功后返回           
            callback(res);
           },          
          fail: function() {
            console.log("网络错误")
            // 发生网络错误等情况触发
           },
          complete: function() {
             console.log("完成后触发");
            // 成功或者失败后触发
           }
        })
      }
    })
  },
  globalData: {
    isLogin:false,
    userInfo: null,
    user:null,
    token: "f47a89d59fdc77dedce5158bd2ee73b6"
  }
})