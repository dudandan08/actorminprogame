// pages/edit/edit.js
import WxValidate from "../../utils/wxValidate.js";
import {
  Http
} from '../../utils/http'
const http = new Http();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2016-09-01",
    time: "12:01",
    imgsUrl: "http://62.234.27.2:8080",
    items: [
      { value: 'man', name: '男', checked: 'true' },
      { value: 'girl', name: '女' },
    ],
    userinfo: "",
    form: {
      userPhoto: "",
      nickName: "",
      ender: "",
      age: '',
      birthDate: "",
      email: "",
      qq: '',
      alipayAccount: "",
      currentAddress: "",
    }
  },
  choose(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          'form.userPhoto': res.tempFilePaths[0]
        })
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证规则
    this.initValidate();
    //  获取用户信息
    this.getUserinfo()
  },
  initValidate() {
    let rules = {
      userPhoto: {
        required: true,
      },
      nickName: {
        required: true,
      },
      gender: {
        required: true,
      },
      age: {
        required: true,
      },
      birthDate: {
        required: true,
      },
      email: {
        required: true,
      },
      qq: {
        required: true,
      },
      alipayAccount: {
        required: true,
      },
      currentAddress: {
        required: true,
      },
    }
    let message = {
      userPhoto: {
        required: "请上传图像",
      },
      nickName: {
        required: "请填写昵称",
      },
      gender: {
        required: "请选择性别",
      },
      age: {
        required: "请填写年龄",
      },
      birthDate: {
        required: "请选择出生年月",
      },
      email: {
        required: "请填写邮箱地址",
      },
      qq: {
        required: "请填写邮箱qq",
      },
      alipayAccount: {
        required: "请填写支付宝账号",
      },
      currentAddress: {
        required: "请填写常用地址",
      },
    }
    this.WxValidate = new WxValidate(rules, message);
  },
  // 获取用户信息
  getUserinfo() {
    let userId = wx.getStorageSync('userId') || ""
    http.sendGetRequest("/userinfo/" + userId)
      .then(res => {
        console.log(res)
        console.log(res.data.data)
        if(res.data.code==200){
          this.setData({
            form:res.data.data
          })
        }
      })
  },
  // 提交表单
  formSubmit(e) {
    console.log("7878")
    console.log(e)
    let params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
      switch (error.param) {
        case "userPhoto":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "nickName":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "gender":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "age":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "birthDate":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "email":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "qq":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "alipayAccount":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "currentAddress":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
      }
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