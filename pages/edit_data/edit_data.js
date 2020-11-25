// pages/edit_data/edit_data.js
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
    imgsUrl: "http://62.234.27.2:8080",
    form:{
      userId:0,
      userPhoto:"../../image/head.png",
      nickName:'',
      gender:0,
      birthDate:"",
      age:"",
      email:"",
      qq: '',
      alipayAccount: "",
      currentAddress: "", 
    },
    array:["女","男"],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 验证规则
this.initValidate();
//  获取用户信息
this.getUserinfo()
  },
  initValidate() {
    let rules = {
      userPhoto: {
        required: true,
      },
      nickName: {
        required: true,
      },
      gender: {
        required: true,
      },
      birthDate: {
        required: true,
      },
      age: {
        required: true,
      },
   
      email: {
        required: true,
      },
      qq: {
        required: true,
      },
      alipayAccount: {
        required: true,
      },
      currentAddress: {
        required: true,
      },
    }
    let message = {
      userPhoto: {
        required: "请上传头像",
      },
      nickName: {
        required: "请输入用户名",
      },
      gender: {
        required: "请选择性别",
      },
      birthDate: {
        required: "请选择出生年月",
      },
      age: {
        required: "请填写年龄",
      },
     
      email: {
        required: "请填写邮箱地址",
      },
      qq: {
        required: "请填写邮箱qq",
      },
      alipayAccount: {
        required: "请填写支付宝账号",
      },
      currentAddress: {
        required: "请填写常用地址",
      },
    }
    this.WxValidate = new WxValidate(rules, message);
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
  // 提交表单
  formSubmit(e) {
    console.log(e)
    console.log(e.detail.value)
    let params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0]
      switch (error.param) {
        case "userPhoto":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "nickName":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "gender":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "age":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "birthDate":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "email":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "qq":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "alipayAccount":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
        case "currentAddress":
          wx.showToast({
            title: error.msg,
            icon: "none"
          })
          break;
      }
    } else {
      http.sendPostRequest("/user/update", {userId: params.userId, userPhoto: params.userPhoto, nickName: params.nickName, gender: params.gender, age: params.age, birthDate: params.birthDate, email: params.email, qq: params.qq, alipayAccount: params.alipayAccount, currentAddress: params.currentAddress })
        .then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'none',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/person/person'
              })
            }, 1000);
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
            })
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  choose(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          'form.userPhoto': res.tempFilePaths[0]
        })
      }
    })
  },
  chooseImage(e) {
    var _this = this;
    var _self = e.currentTarget.dataset;
    let type = e.currentTarget.dataset.type
    wx.showActionSheet({
        itemList: ["从相册选择", "拍照"],
        itemColor: "#333",
        success: function(ret) {
            if (ret.tapIndex + 1 != 0) {
                switch (ret.index) {
                    case 1: //从相册选择
                        var sourceType = ['album'];
                        break;
                    case 2: //拍照
                        var sourceType = ['camera'];
                        break;
                }
                wx.chooseImage({
                    count: 9, // 最多可以选择的图片张数，默认9
                    sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
                    sourceType: sourceType, // album 从相册选图，camera 使用相机，默认二者都有
                    success: function(res) {
                        // success
                        //console.log(res)
                        wx.showLoading({
                            title: '图片获取中...',
                        })
                        _this.uploadImage(res.tempFilePaths[0], (res) => {
                            wx.hideLoading();
                            _this.setData({
                              'form.userPhoto': res.tempFilePaths[0]
                            });
                        });
                    },
                    fail: function() {
                        // fail
                        console.log("fail");

                    },
                    complete: function() {
                        // complete
                        console.log("complete");
                    }
                })
            }
        },
        fail: function(ret) {

        }
    })
},
//上图片上传到服务器
uploadImage(filePath, callback) {
    var _this = this;
    var timer = setTimeout(() => {
        // console.log(filePath);
        wx.uploadFile({
            //url: app.globalData.url + "api/upload",
            url: baseUrl + "/upload",
            header: {
                'content-type': 'multipart/form-data',
            },
            filePath: filePath,
            name: 'pic',
            formData: {
                image: filePath
            },
            success: function(ret) {
                // console.log(JSON.stringify(ret));
                wx.hideLoading();
                if (ret.data.status == 1000) {
                    wx.showToast({
                        icon: 'none',
                        duration: 3000,
                        title: ret.data.msg,
                    })
                    return false;
                } else if (ret.statusCode == 404) {
                    wx.showToast({
                        icon: 'none',
                        duration: 3000,
                        title: '数据请求地址未找到',
                    })
                } else {
                    typeof ret.data != "object" ? ret.data = JSON.parse(ret.data) : '';
                    if (ret) {
                        if (typeof callback == "function" || typeof callback == "object") {
                            var timer = setTimeout(() => {
                                callback(ret.data);
                                clearTimeout(timer);
                            }, 300);
                        }
                    } else {
                        wx.showToast({
                            icon: 'none',
                            duration: 3000,
                            title: '图片获取失败,请重试',
                        })
                    }
                }
            },
            fail: function(res) {
                // console.log(res);
                wx.hideLoading();
                wx.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: '网络请求失败，请确保网络是否正常',
                })
            }
        });
    }, 10);
},
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      'form.birthDate': e.detail.value
    })
  },
  change1(e){
    this.setData({
      'form.gender': e.detail.value-0+1
    })
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