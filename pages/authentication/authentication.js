// pages/authentication/authentication.js

import WxValidate from "../../utils/wxValidate.js";
import { config } from '../../utils/config.js';

import {Http} from"../../utils/http";

var util=require('../../utils/util');

const baseUrl = config.formal.server;
const api = '/api-wx';

const app = getApp();

const http = new Http();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: { //增加form子元素
      realName: "",
      certificateType: '',
      certificateNo: '',
      certificateImg1: '',
      certificateImg2:''
    },
    imgs: "",
    imgs1:"",
    showPickerCt:"",
    credentialTypes: ['身份证', '军官证', '学生证'],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证规则
    this.initValidate();
  },

  /**
   * 验证规则
   */
  initValidate() {
    let rules = {
      realName: {
        required: true,
      },
      certificateType: {
        required: true,
      },
      certificateNo: {
        required: true,
      },
      certificateImg1: {
        required: true,
      },
      certificateImg2:{
        required: true,
      }
    }
    let message = {
      realName: {
        required: '请输入姓名',
      },
      certificateType: {
        required: '选择证件类型',
      },
      certificateNo: {
        required: '请输入证件号码',
      },
      certificateImg1: {
        required: '请选择身份证正面照片',
      },
      certificateImg2: {
        required: '请选择身份证反面照片',
      }
    }
    this.WxValidate = new WxValidate(rules, message);
  },

  /**
   * 图片选择方法
   */
  choose(e) {
    let that = this
    console.log(e.currentTarget.dataset.type)
    let type = e.currentTarget.dataset.type
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '上传中',
          });
        console.log(res)
        if (type =="front"){
          that.setData({
            imgs: res.tempFilePaths[0],
            "form.certificateImg1":res.tempFilePaths[0]
          })
        }else{
          that.setData({
            imgs1: res.tempFilePaths[0],
            "form.certificateImg2":res.tempFilePaths[0],
          }) 
        }
        wx.hideLoading();
      }
    })
  },
  /**
   * 
   * @param {*} e 
   */
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      "form.certificateType":e.detail.value
    })
  },

   // 姓名
   realName(e) {
    this.setData({
      "form.name": e.detail.value
    })
  },
  // 证件号
  certificateNo(e) {
    this.setData({
      "form.password1": e.detail.value
    })
  },

/**
 * 提交表单
 * @param {*} e 
 */
  formSubmit(e) {
    console.log(e)
    let params = e.detail.value
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
      console.log(error)
      switch (error.param) {
        case "realName":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "certificateType":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "certificateNo":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "certificateImg1":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "certificateImg2":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
      }
    } else {
      console.log("注册接口 开始")
      let userid;
      if(app.globalData.user==null){
        userid=app.getLocalStorage("userId");
      }else{
        userid=app.globalData.user.userId;
      }
      let paramsData={
        "userId":userid,
        "realFullName":params.realName,
        "certificateType":params.certificateType,
        "certificateNo":params.certificateNo,
        "certificateImg1":params.certificateImg1,
        "certificateImg2":params.certificateImg2
      }
      console.log("实名认证上传的参对象："+JSON.stringify(paramsData) );
     // "certificateTime":util.formatTime(new Date())
      //let url=baseUrl + api + "/userreal/save";
      let url= "/userreal/save";
      http.sendPostRequest(url,paramsData).then(resp=>{
        console.log("实名认证 返回结果："+ JSON.stringify(resp) );
        let result=resp;
        if(result.code==200){
          wx.showToast({
            title: result.message,
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/platform/platform'
          });
        }
      })
      // wx.request({
      //   url: url,
      //   data: paramsData,
      //   method: "POST",
      //   success:function(resp){
      //     console.log("实名认证 返回结果："+ JSON.stringify(resp) );
      //     let result=resp.data;
      //     if(result.code==200){
      //       if(result.data){
      //         wx.showToast({
      //           title: '实名认证已提交请等待系统审核',
      //           icon: 'success',
      //           duration: 2000
      //         });
      //         wx.navigateTo({
      //           url: '/pages/platform/platform'
      //         });
      //       }
      //     }
      //   },
      //   fail:function(){
      //     console.log("实名认证：网络错误")
      //   }
      // })
    }
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