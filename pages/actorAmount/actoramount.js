// pages/actorAmount/actoramount.js

import {Http} from"../../utils/http";

var util=require('../../utils/util');

const http = new Http();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalMoney:0,//总金额
    withdrawMoney:0,//取款
    depositMoney:0 //存款
  },

  loadData(){
    wx.showLoading({
      title: '加载中...',
    })
      let url= "/useraccount/"+app.globalData.user.userId;
      console.log(url);
      http.sendGetRequest(url,null).then(resp=>{
        console.log("艺人帐户 返回结果："+ JSON.stringify(resp) );
        let result=resp.data;
        if(result.code==200){
          if(result.data!=null){
            this.setData({
              totalMoney:result.data.totalamount
            });
            this.setData({
              withdrawMoney:result.data.alreadyamount
            });
            this.setData({
              depositMoney:result.data.remainingamount
            });            
           
          }
        }
        wx.hideLoading();
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.access);
    if(!app.globalData.access){
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