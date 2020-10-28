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
          token: wx.getStorageSync('token') || ""
        },
        method: 'POST',
        data: userId ? {
					userId,
					...data
        } : data,

        success(res) {
          resolve(res)
        },
        fail() {
          reject('请求的接口错误')
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  }
  sendGetRequest(url, data = {}) {
    let userId=wx.getStorageSync('userId') || ""
    return new Promise((resolve, reject) => {
      wx.request({
        url: Base.restUrl + url,
        header: { 
          'content-type': 'application/json',
          token: wx.getStorageSync('token') || ""
        },
        // data: userId ? {
				// 	userId,
				// 	...data
        // } : data,
        data:data,
        success(res) {
          resolve(res.data)
        },
        fail() {
          reject('请求的接口错误')
        }
      })
    })
  }
}
export {
  Http
};