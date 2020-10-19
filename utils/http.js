import {
  Base
} from './base';



class Http {
  constructor() {

  }
  getNetworkType() {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success(res) {
          const networkType = res.networkType
          console.log(res)
          resolve(networkType)
        }
      })
    })
  }
  // post方式请求数据的方法
  sendPostRequest(url, data = {}) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    return new Promise((resolve, reject) => {
      let userId=wx.getStorageSync('userId') || ""
      wx.request({
        url: Base.restUrl + url,
        header: { 
          'content-type': 'application/json',
          'token': getApp().globalData.token 
        },
        method: 'POST',
        data: userId ? {
					userId,
					...data
				} : data,
        success(res) {
          // wx.hideLoading({})
          resolve(res.data)
        },
        fail() {
          // wx.hideLoading({})

          reject('请求的接口错误')
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  }

}
export {
  Http
};