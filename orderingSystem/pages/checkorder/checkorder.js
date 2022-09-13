// pages/checkorder/checkorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:'', //订单列表
    shopnum:0, //商品数量
    totalPrice:0, //总金额
  },
  // 支付
  pay() {
    // 发起微信支付
    // 调用前需在小程序微信公众平台 -功能 - 微信支付入口申请接入微信支付
    // 申请微信支付的小程序账户需要进行微信认证，注册主体为个人的小程序目前暂不支持微信认证，也就是注册主体为个人的小程序不支持申请微信支付。
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success (res) { },
    //   fail (res) { }
    // })
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    var shopList = JSON.parse(options.shopList)
    this.setData({
      orderList:shopList,
      totalPrice:options.totalPrice
    })
    // wx.request({
    //   url: 'http://localhost:3000/api/food/order',
    //   success: res => {
    //     console.log(res.data)
    //     this.setData({
    //       orderList:res.data
    //     })
    //     // console.log(this.data.orderList)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})