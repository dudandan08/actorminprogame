
import WxValidate from "../../utils/wxValidate.js";
import {
  Http
} from '../../utils/http'
const app = getApp();
const http = new Http();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    user: "",
    form: {
      userPhoto: "../../image/head.png",
      nickName: '',
      gender: 0,
      birthDate: "",
      age: "",
      email: "",
      qq: '',
      alipayAccount: "",
      currentAddress: "",
    },
  },
  canILogin() {

  },
onLoad(){
  console.log("1112")
  
},
 /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("111")
    this.setData({
      token: wx.getStorageSync('token'),
      user: wx.getStorageSync('user')
    })
    if (wx.getStorageSync('token')) {
      this.getUserinfo()
    }
  },
  // 获取用户信息
  getUserinfo() {
    let userId = wx.getStorageSync('userId') || ""
    http.sendGetRequest("/userinfo/" + userId)
      .then(res => {
        console.log(res)
        console.log(res.data.data)
        if (res.code == 200) {
          this.setData({
            form: res.data
          })
        }
      })
  },
  // 跳转至编辑资料
  goTo() {
    wx.navigateTo({
      url: '/pages/edit_data/edit_data',
    })
  },
  // 跳转至登录
  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 退出登录
  out() {
    wx.clearStorage()
    this.setData({
      token:""
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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