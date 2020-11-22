// pages/actorApply/actorApply.js
import WxValidate from "../../utils/wxValidate.js";
import {
  Http
} from '../../utils/http'
const http = new Http();
const app = getApp();
let jie = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉框变量 企业搜索
    flag: false,
    // 平台列表
    gangedData1: [],
    // 企业列表
    meetData: [],
    // 平台id
    id: 0,
    // 企业id
    guildId: 0,
    orgName: "",
    orgName1: "",
    //申请说明
    applyDescr: "",
    form: {
      seleNull: null,
      seleNull1: null,
      index: 0,
      index1: 0,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  enterprise(e) {
    if (e.detail.value1 != this.data.orgName1) {
      this.setData({
        guildId: 0
      })
    }
    this.setData({
      orgName: e.detail.value
    })

    if (e.detail.value) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false,
        guildId: 0
      })

    }
    this.getAssociation()
  },
  // 获取所属平台
  getData() {
    http.sendGetRequest("/platform/all", {})
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            gangedData1: res.data
          })

        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
        }
      })
  },
  // 提交表单
  formSubmit(e) {
    if (!this.data.guildId) {
      wx.showToast({
        title: '请选择企业',
        icon: 'none',
        duration: 2000
      })
      return
    }
    http.sendPostRequest("/actor/apply/save", 
    { 
      applyPlatformId: this.data.id, 
      orgId: this.data.guildId, 
      applyDescr: this.data.applyDescr 
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
            title: res.message,
            icon: 'none',
          })
        }
      })

  },
  // 选择平台
  bindPickerChange(e) {
    console.log(e)
    this.setData({
      "form.seleNull": '1',
      "form.index": e.detail.value,
      platformId: this.data.gangedData1[e.detail.value].id,
      id: this.data.gangedData1[e.detail.value].id
    })
    this.getAssociation()
  },
  // 所属公会
  getAssociation() {
    if (!this.data.id && !this.data.orgName) {
      this.setData({
        meetData: [],
      })
      return
    }
    http.sendPostRequest("/getOrg", { platformId: this.data.id || 0, orgName: this.data.orgName })
      .then(res => {
        console.log(res.data)
        jie = false
        if (res.data.code == 200) {
          this.setData({
            meetData: res.data.data
          })
          if (this.data.id) {
            this.setData({
              guildId: this.data.meetData[0].id
            })
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
        }
      })
  },
  chang(e) {
    console.log(e)
    console.log(e.target.dataset.id)
    this.setData({
      flag: false,
      guildId: e.target.dataset.id,
      orgName1: this.data.meetData[e.target.dataset.index].orgName
    })
  },
  // 选择企业
  bindPickerChange1(e) {
    console.log(e)
    this.setData({
      "form.seleNull1": '0',
      "form.index1": e.detail.value,
      guildId: this.data.meetData[e.detail.value].id
    })
  },
  // 填写说明
  shuo(e) {
    this.setData({
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