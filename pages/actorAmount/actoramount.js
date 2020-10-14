// pages/actorAmount/actoramount.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalMoney:5000,//总金额
    withdrawMoney:4300,//取款
    depositMoney:700 //存款
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
    this.setData({
      totalMoney:7000
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