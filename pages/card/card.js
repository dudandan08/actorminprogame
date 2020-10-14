// pages/card/card.js
import WxValidate from "../../utils/wxValidate.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['工商银行', '建设银行', '交通银行', '农业银行'],
    form: {
      seleNull:null,
      index: 0,
      name: "",
      site: "",
      number: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 验证规则
    this.initValidate();
  },
  initValidate() {
    let rules = {
      bank: {
        required: true,
      },
      site: {
        required: true,
      },
      name: {
        required: true,
      },
      number: {
        required: true,
      }
    }
    let message = {
      bank: {
        required: '请选择银行'
      },
      site: {
        required: '请输入开户行',
      },
      name: {
        required: '请输入开户人姓名',
      },
      number: {
        required: '请输入银行卡号',
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
        case "bank":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "site":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "name":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break
        case "number":
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
  // 选择银行
  bindPickerChange(e) {
    this.setData({
      "form.seleNull": '0',
      "form.index": e.detail.value
    })
  },
  // 输入开户行
  hang(e) {
    this.setData({
      "form.site": e.detail.value
    })
  },
  // 输入开户姓名
  ming(e) {
    this.setData({
      "form.name": e.detail.value
    })
  },
  // 输入卡号
  hao(e) {
    this.setData({
      "form.number": e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})