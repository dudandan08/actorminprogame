
import WxValidate from "../../utils/wxValidate.js";
import {
  Http
} from '../../utils/http'
const app = getApp();
const http = new Http();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true,
    form: {
      name: "",
      password: '',
    }
  },
  canILogin(){
    if(!wx.canIUse('button.open-type.getUserInfo')){
      wx.showModal({
        title: '微信版本太旧',
        content: '使用旧版本微信无法登录，请升级您的微信版本',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证规则
    this.initValidate();
    // let loginstatus=app.getLocalStorage("islogin") ;
    // console.log(loginstatus);
    // if(loginstatus){
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //   })
    // }
  },
  initValidate() {
    let rules = {
      name: {
        required: true,
      },
      password: {
        required: true,
      }
    }
    let message = {
      name: {
        required: '请输入姓名',
      },
      password: {
        required: '请输入密码',
      },
    }
    this.WxValidate = new WxValidate(rules, message);
  },
  // 姓名
  // ming(e) {
  //   this.setData({
  //     "form.name": e.detail.value
  //   })
  // },
  // // 密码
  // phone(e) {
  //   this.setData({
  //     "form.password": e.detail.value
  //   })
  // },
  // 提交表单
  formSubmit(e) {
    // console.log(e)
    let params = e.detail.value
     console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
      // console.log(error)
      switch (error.param) {
        case "name":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "password":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break
      }
    }else{
      http.sendPostRequest("/user/doLogin", { userName:params.name,pwd:params.password })
        .then(res=> {
          console.log(res)
          let result=res.data;
          if(result.code==200){
                
            app.globalData.user=result.data
            app.globalData.isLogin=true;
            app.globalData.token=result.data.tokenId
            wx.setStorageSync('userId', result.data.userId)
            wx.setStorageSync('token', result.data.tokenId)
            app.setLocalStorage("user",result.data);
            app.setLocalStorage("islogin",true);            
            app.setLocalStorage("token",result.data.tokenId);
            wx.switchTab({
              url: '/pages/platform/platform',
            })
        
          }else{
            wx.showToast({
              title:result.message,
              icon: 'none',
            })
          }
        })
    }
  },
  register(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})