// pages/extract/extract.js
import WxValidate from "../../utils/wxValidate.js";
import { Http } from "../../utils/http";
const http = new Http();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {//增加form子元素
      number: "",
    },
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证规则
    this.initValidate();
    // 获取可提现的金额
    this.getdata()
  },
  getdata() {
    let userId = wx.getStorageSync('userId') || ""
    http.sendGetRequest('/useraccount/remainingamount/' + userId).then(res => {
      console.log(res)
      console.log(res.code)
      if (res.code == 200) {
        this.setData({
          total: res.data
        })
      }else{
        wx.showToast({
          title: res.message,
          icon: 'none',
        })
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 1000);
      }
    })
  },
  initValidate() {
    let rules = {
      number: {
        required: true,
        min: 0.01,
      },

    }
    let message = {
      number: {
        required: '请输入金额',
        min: '请输入正确的金额'
      },

    }
    this.WxValidate = new WxValidate(rules, message);
  },
  money(e) {
    this.setData({
      "form.number": e.detail.value
    })
  },
  // 提交表单
  formSubmit(e) {
    // console.log(e)
    let params = e.detail.value
    // console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
       console.log(error)
      switch (error.param) {
        case "number":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
      }
    } else {
      http.sendPostRequest("/income/save", 
      { 
        income: params.number
      }
      ).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '已提交，等待审核',
              icon: 'none',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/platform/platform'
              })
            }, 1000);
  
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
            })
          }
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