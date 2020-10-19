// pages/person/person.js
import {
  Http
} from '../../utils/http'
const app = getApp()
const http = new Http();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    currentIndex: 0,
    "firstList": ["LXT", "LXT", "LXT", "LXT", "LXT", "LXT"],
    "secondList": ["GFF", "GFF", "GFF", "GFF", "GFF", "GFF", "GFF", "GFF"],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // post get测试
    // this.post()
    // this.get()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(app.globalData.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  post(){
    http.sendPostRequest("/actor/apply/save",{platformId:"1",guildId:"14",applyDescr:""})
    .then(res => {
     
    })
  },
  get(){
    http.sendGetRequest("/actor/info")
    .then(res => { 
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
//swiper切换时会调用
pagechange: function (e) {
  if ("touch" === e.detail.source) {
    let currentPageIndex = this.data.currentIndex
    currentPageIndex = (currentPageIndex + 1) % 2
    this.setData({
      currentIndex: currentPageIndex
    })
  }
},
//用户点击tab时调用
titleClick: function (e) {
  let currentPageIndex =
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
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