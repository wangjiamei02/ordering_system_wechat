// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listMessage: [], // 页面数据
    currentLeft: 0, // 左侧菜单栏点击样式
    selectId: "item0", // scroll-into-view滚动的元素
    isCar: true, // 购物车
    shopList: [], // 购物车数据
    showlist: false, //购物车列表的显示
    footerText: true, //总金额的显示
    totalPrice: 0, //总金额
  },
  // 左侧菜单栏点击样式
  leftMenu(e) {
    console.log(e.target.dataset)
    this.setData({
      currentLeft: e.currentTarget.dataset.list,
      selectId: "item" + e.currentTarget.dataset.list
    })
  },
  // 点击商品加入购物车
  addShop(e) {
    // 选中商品的数据
    var shop = e.currentTarget.dataset.shop.specfoods[0]
    console.log(e.currentTarget.dataset.shop.specfoods[0])
    let list = {
      name: shop.name, //选中的商品名称
      price: shop.price, //选中的商品价格
      num: 1 //选中商品的数量
    }
    this.data.shopList.push(list)
    console.log(this.data.shopList)
    this.setData({
      isCar: false, // 购物车的颜色
      shopList: this.data.shopList, // 选中商品的数据
      footerText: false, // 总金额的显示
      totalPrice: this.data.totalPrice += shop.price //总金额
    })
  },
  // 当购物车为橙色时点击弹出层显示
  shopList() {
    this.setData({
      showlist: true
    })
  },
  // 点击遮罩层关闭
  closepop() {
    this.setData({
      showlist: false
    })
  },
  //点击清空购物车
  clearshop() {
    wx.showModal({
      title: '商品',
      content: '确定要清空购物车吗？',
      success: res => {
        // 点击确定按钮后
        if (res.confirm) {
          this.setData({
            isCar: true,
            footerText: true,
            showlist: false,
            totalPrice: 0,
            shopList: []
          })
        }
      }
    })
  },
  // 点击商品数量加1
  addnum(e) {
    let index = e.currentTarget.dataset.index
    this.data.shopList[index].num++
    var price = this.data.totalPrice += this.data.shopList[index].price
    this.setData({
      shopList: this.data.shopList,
      totalPrice: price
    })
  },
  // 点击商品数量减1
  reducenum(e) {
    let index = e.currentTarget.dataset.index
    if (this.data.shopList[index].num <= 1) {
      // 商品数量为1时用户点击确定后删除商品
      wx.showModal({
        title: '商品',
        content: '确定不要了吗？',
        success: res => {
          // 点击确定按钮后
          if (res.confirm) {
            // 总金额减去 删除的商品 
            var price = this.data.totalPrice -= this.data.shopList[index].price
            // 商品列表删除 删除的商品 
            this.data.shopList.splice(index, 1)
            // 数据重新赋值
            this.setData({
              shopList: this.data.shopList,
              totalPrice: price
            })
            // 商品列表为空时
            if (this.data.shopList.length == 0) {
              this.setData({
                isCar: true,
                showlist: false,
                footerText: true,
              })
            }
          }
        }
      })
    } else {
      this.data.shopList[index].num--
      var price = this.data.totalPrice -= this.data.shopList[index].price
      this.setData({
        shopList: this.data.shopList,
        totalPrice: price
      })
    }
  },
  // 选好了-页面跳转
  checkshop() {
    var shopList = JSON.stringify(this.data.shopList)
    console.log(shopList)
    wx.navigateTo({
      url: '/pages/checkorder/checkorder?shopList=' + shopList + '&totalPrice=' + this.data.totalPrice
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://127.0.0.1:3000/api/food/list',
      success: res => {
        // console.log(res.data)
        this.setData({
          listMessage: res.data
        })
      }
    })
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