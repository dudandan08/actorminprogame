// pages/actorApply/actorApply.js
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
    gangedData: [
      {
        id: 1,
        platform: "星火传媒",
        meet: [
          { id: 14, name: "星火传媒顶级公会" }
        ]
      },
      {
        id: 3,
        platform: " NOW直播",
        meet: [
          { id: 34, name: "NOW公会 " }
        ]
      }
    ],
    meetDta: [],
    platformId: 0,
    guildId: 0,
    applyDescr: "",
    // array: ['平台1', '平台2', '平台3', '平台4'],
    // array1: ['公会1', '公会2', '公会3', '公会4'],
    form: {
      seleNull: null,
      seleNull1: null,
      index: 0,
      index1: 0,
      explain: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证规则
    this.initValidate();
    console.log(this.data.gangedData)

  },
  initValidate() {
    let rules = {
      platform: {
        required: true,
      },
      // union: {
      //   required: true,
      // },
      explain: {
        required: true,
      },
    }
    let message = {
      platform: {
        required: "请选择所属平台",
      },
      // union: {
      //   required: "请选择所属公会",
      // },
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
        // case "union":
        //   wx.showToast({
        //     title: error.msg,
        //     icon: "none"
        //   })
        //   break;
        case "explain":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break
      }
    } else {
      http.sendPostRequest("/actor/apply/save", { platformId: this.data.platformId, guildId: this.data.guildId, applyDescr: this.data.applyDescr })
        .then(res => {
          console.log(res)
          if(res.code==200){
            wx.showToast({
              title: '已提交，等待审核',
              icon: 'none',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/platform/platform'
              })
            }, 1000);
            
          }else{
            wx.showToast({
              title: res.message,
              icon: 'none',
            })
          }
        })
    }
  },
  // 选择平台
  bindPickerChange(e) {
    console.log(e)
    let meetDta = this.data.gangedData[e.detail.value].meet
    this.setData({
      "form.seleNull": '1',
      "form.index": e.detail.value,
      meetDta: meetDta,
      platformId: this.data.gangedData[e.detail.value].id,
      guildId: this.data.gangedData[e.detail.value].meet[0].id
    })

  },
  laborUnion() {
    if (!this.data.form.index) {
      wx.showToast({
        title: '请先选择所属平台',
        icon: 'none',
      })
    }
  },
  // 选择公会
  bindPickerChange1(e) {

    this.setData({
      "form.seleNull1": '0',
      "form.index1": e.detail.value
    })
  },
  // 填写说明
  shuo(e) {
    this.setData({
      "form.explain": e.detail.value,
      applyDescr: e.detail.value,
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