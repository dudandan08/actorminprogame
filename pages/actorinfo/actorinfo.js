// pages/actorAmount/actorinfo.js


import {Http} from"../../utils/http";

var util=require('../../utils/util');


const app = getApp();

const http = new Http();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      actorsData:[]

  },

  loadData(){
    wx.showLoading({
      title: '加载中...',
    })
      let url= "/actor/info/"+app.globalData.user.userId;
      console.log(url);
      http.sendGetRequest(url,null).then(resp=>{
        console.log("艺人信息 返回结果："+ JSON.stringify(resp) );
        let result=resp.data;
        if(result.code==200){
          if(result.data!=null){
            this.setData({
              actorsData:result.data
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
    this.loadData();
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