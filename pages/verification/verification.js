// pages/verification/verification.js
import WxValidate from "../../utils/wxValidate.js";
import { Http } from "../../utils/http";
const http = new Http();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {//增加form子元素
      name: "",
      tel: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证规则
    this.initValidate();
  },
  initValidate() {
    let rules = {
      name: {
        required: true,
        minlength: 2,
      },
      tel: {
        required: true,
        tel: true,
      }
    }
    let message = {
      name: {
        required: '请输入姓名',
        minlength: '名字不能少于2个字'
      },
      tel: {
        required: '请输入手机号',
        tel: "请输入正确的手机号"
      },
    }
    this.WxValidate = new WxValidate(rules, message);
  },
  // 姓名
  ming(e) {
    this.setData({
      "form.name": e.detail.value
    })
  },
  // 手机号
  phone(e) {
    this.setData({
      "form.tel": e.detail.value
    })
  },
  // 提交表单
  formSubmit(e) {
    // console.log(e)
    let params = e.detail.value

    let userid;
      if(app.globalData.user==null){
        userid=app.getLocalStorage("userId");
      }else{
        userid=app.globalData.user.userId;
      }

    // console.log(params)
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
        case "tel":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break
      }
    } else {

      http.sendPostRequest('/actor/macth', {"userId":userid, fullName: e.detail.value.name, mobile: e.detail.value.tel }).then(res => {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code ==200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/platform/platform'
            })
          }, 1000);
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
        // if (res.code == 200) {
        //   this.setData({
        //     total: res.data
        //   })
        // }
      })
    }
    return false
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