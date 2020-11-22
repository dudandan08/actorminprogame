// pages/actorAmount/actoramount.js

import { Http } from "../../utils/http";

var util = require('../../utils/util');

const http = new Http();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalMoney: 0,//总金额
    withdrawMoney: 0,//取款
    depositMoney: 0 //存款
  },

  loadData() {
    let that=this
    wx.showLoading({
      title: '加载中...',
    })
    let userId = wx.getStorageSync('userId') || ""
    let url = "/useraccount/" + userId;
    console.log(url);
    http.sendGetRequest(url, null).then(resp => {
      console.log("艺人帐户 返回结果：" + JSON.stringify(resp));
      let result = resp.data;
      if (resp.code == 200) {
        that.setData({
          totalMoney:  result.totalAmount
        });
        this.setData({
          withdrawMoney: result.alreadyAmount
        });
        this.setData({
          depositMoney: result.remainingAmount
        });
      }
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(app.globalData.access);
    if (!app.globalData.access) {
      console.log("没有登录");
      // wx.showModal({
      //   title: '提示',
      //   content: '需要登录才可以查看此信息？',
      //   success: function (sm) {
      //     if (sm.confirm) {
      //         wx.switchTab({
      //           url: '../login/login',
      //         });
      //       } else if (sm.cancel) {
      //         //取消
      //       }
      //     }
      //   })
      // wx.switchTab({
      //   url: '../login/login',
      // });
    }
    // this.setData({
    //   totalMoney:7000
    // })

    this.loadData();
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