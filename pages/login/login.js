
import WxValidate from "../../utils/wxValidate.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {//增加form子元素
      name: "",
      password: '',
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
  ming(e) {
    this.setData({
      "form.name": e.detail.value
    })
  },
  // 密码
  phone(e) {
    this.setData({
      "form.password": e.detail.value
    })
  },
  // 提交表单
  formSubmit(e) {
    // console.log(e)
    let params = e.detail.value
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
        case "password":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break
      }
    }else{
      console.log("登录接口")
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