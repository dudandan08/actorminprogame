import WxValidate from "../../utils/wxValidate.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: { //增加form子元素
      name: "",
      password1: '',
      password2: '',
      flag: 1,
    },
    kong:false,
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
      name: {
        required: true,
      },
      password1: {
        required: true,
      },
      password2: {
        required: true,
      },
      flag: {
        required: true,
      }
    }
    let message = {
      name: {
        required: '请输入姓名',
      },
      password1: {
        required: '请输入密码',
      },
      password2: {
        required: '请输入确认密码',
      },
      flag: {
        required: '请勾选注册条款',
      }
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
  word1(e) {
    this.setData({
      "form.password1": e.detail.value
    })
  },
  // 确认密码
  word2(e) {
    this.setData({
      "form.password2": e.detail.value
    })
  },
  // 注册条款
  radio(e) {
    if (e.currentTarget.dataset.type) {
      this.setData({
        "form.flag": ""
      })
    }else{
      this.setData({
        "form.flag": 1
      }) 
    }
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
        case "flag":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
      }
    } else {
      console.log("注册接口")
    }
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