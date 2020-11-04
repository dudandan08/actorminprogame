import WxValidate from "../../utils/wxValidate.js";
import { config } from '../../utils/config.js';

const baseUrl = config.formal.server;
const api = '/api-wx';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: { 
      name: "",
      tel: "",
      password1: '',
      password2: '',
    },
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
      },
      tel: {
        required: true,
      },
      password1: {
        required: true,
      },
      password2: {
        required: true,
      },
    }
    let message = {
      name: {
        required: '请输入姓名',
      },
      tel: {
        required: '请输入手机号码',
      },
      password1: {
        required: '请输入密码',
      },
      password2: {
        required: '请输入确认密码',
      },
    }
    this.WxValidate = new WxValidate(rules, message);
  },





  // 提交表单
  formSubmit(e) {
    console.log(e)
    let params = e.detail.value
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
      console.log(error)
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
          break;
        case "password1":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "password2":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
      }
    } else {
      console.log("注册接口 开始")
      let paramsData = {
        userName: params.name,
        pwd: params.password1,
        confirmPassword: params.password2,
        mobile: params.tel
      }
      let url = baseUrl + api + "/user/register";
      wx.request({
        url: url,
        data: paramsData,
        method: "POST",
        success: function (resp) {
          let result = resp.data;
          console.log(result )
          if (result.code == 200) {
            if (result.data) {
              wx.showToast({
                title: '注册成功，请重新登录',
                icon: 'none',
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }, 1000);
            }
          }else{
            wx.showToast({
              title:result.message,
              icon: 'none',
            })
          }
        },
        fail: function () {
          console.log("注册：网络错误")
        }
      })
    }
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