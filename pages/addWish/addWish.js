import {
  addHelp
} from "../../api/help"
const subs = wx.getStorageSync('subs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: [{
        values: Object.keys(subs),
        className: 'column1'
      },
      {
        values: subs['生活'],
        className: 'column2'
      }
    ],
    subs: {},
    name: '',
    goodType: '',
    info: '',
    sid: 0,
    cid: 0,
    show: false
  },
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 弹出层控制
  onShowSelect() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onSetName(e) {
    this.setData({
      name: e.detail
    })
  },
  onSetInfo(e) {
    this.setData({
      info: e.detail
    })
  },
  // 选择器
  onChangeType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, subs[value[0]])
  },
  onSelectType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    let sid = value[1].index
    let content = value[0]
    let subName = value[1].values
    let cid = this.findCid(content)
    this.setData({
      goodType: subName,
      sid,
      cid
    })
    this.onClose()
    console.log(sid, cid)
  },
  findCid(contentName) {
    let all = wx.getStorageSync('content')
    let cid = 0
    all.forEach((item) => {
      if (item.name == contentName) {
        cid = item.id
      }
    })
    return cid
  },
  onSave() {
    if (this.data.sid && this.data.name && this.data.info) {
      addHelp(this.data.sid, this.data.name, this.data.info).then((res)=>{
        wx.showToast({
          title: '提交成功',
        })
        wx.navigateBack()
      })
    } else {
      wx.showToast({
        title: '请填写好内容',
      })
    }
  }
})