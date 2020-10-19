
export const httpAgent = (url, requestType, params, successCallBack, failCallBack, showLoading) => {
  if (showLoading) {
    wx.showLoading({
      title: 'Loading...',
    })
  }

  console.log("联网")
  console.log(url)
  console.log(params)
  console.log(requestType)

  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: params,
    method: requestType,
    // header: {
    //   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' // 默认值
    // },
    header: {
      'Content-Type': 'application/json',
      'token': token
    },
    success: function (res) {
      wx.hideLoading();
      var data = res.data;
      successCallBack(data);
    },
    fail: function (res) {
      wx.hideLoading();
      failCallBack && failCallBack(res);
    }
  })
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  http:httpAgent
}
