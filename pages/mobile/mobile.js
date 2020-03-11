// pages/mobile/mobile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendMobile',(res)=>{
      this.setData({
        mobile:res
      })
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
  verify(content){
    const reg = new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/)
    return reg.test(content)
  },
  _showToast() {
    wx.showToast({
      title: '请输入正确的11位手机号码',
      icon: 'none',
      duration: 2000
    })
  },
  onConfirm (val) {
    let value = val.detail
    if (this.verify(value)){
      this.setData({
        mobile:value
      })
      this.onSubmit()
    }else{
      this._showToast()
    }
  },
  onBlur (val) {
    let value = val.detail
    if (!this.verify(value)){
      this._showToast()
    }
    this.setData({
      mobile:value
    })
  },
  onSubmit(){
    const mobile = this.data.mobile
    if (this.verify(mobile)){
      console.log('提交')
    }
  }
})