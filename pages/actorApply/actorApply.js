// pages/actorApply/actorApply.js
import WxValidate from "../../utils/wxValidate.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['平台1', '平台2', '平台3', '平台4'],
    array1: ['公会1', '公会2', '公会3', '公会4'], 
    form:{
      seleNull:null,
      seleNull1: null,
      index: 0,
      index1: 0,
      explain:"",
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
      platform: {
        required: true,
      },
      union: {
        required: true,
      },
      explain: {
        required: true,
      },
    }
    let message = {
      platform: {
        required: "请选择所属平台",
      },
      union: {
        required: "请选择所属公会",
      },
      explain: {
        required: "请填写申请说明",
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
        case "platform":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "union":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "explain":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break
      }
    } else {
      console.log("绑定银行卡")
    }
  },
  // 选择平台
  bindPickerChange(e) {
    this.setData({
      "form.seleNull": '0',
      "form.index": e.detail.value
    })
  },
  // 选择公会
  bindPickerChange1(e) {
    this.setData({
      "form.seleNull1": '0',
      "form.index1": e.detail.value
    })
  },
  // 填写说明
  shuo(e){
    this.setData({
      "form.explain": e.detail.value,
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