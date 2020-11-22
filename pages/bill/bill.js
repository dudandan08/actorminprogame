// pages/bill/bill.js

import { Http } from "../../utils/http";

var util = require('../../utils/util');

const http = new Http();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userId:0,
      recordlist:[]
  },
  getData(){
    let userid;
      if(app.globalData.user==null){
        userid=app.getLocalStorage("userId");
      }else{
        userid=app.globalData.user.userId;
      }
    let url = "/getIncomeBillsRecord/"+userid;
    console.log(url);
   
    http.sendGetRequest(url, null).then(result => {
      //console.log("发放记录 返回结果：" + JSON.stringify(result));
      if (result.code == 200) {
        if (result.data != null) {
          this.setData({
            recordlist: result.data
          })
        }
      }
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中...',
    });
    this.getData();
    wx.hideLoading();
  
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
    // wx.showLoading({
    //   title: '数据加载中...',
    // });
    // this.getData();
    // wx.hideLoading();
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