import { getGoodByUid }from '../../api/good'
import { createGoods } from '../../models/good'
import { normallArray } from '../../util/normal'
const normalGoods = normallArray(createGoods)
const app = getApp()
Page({
  data: {
    logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    user: '',
    uid: 0,
    page: 1,
    total: 10,
    goods: []
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendUse',(res)=>{
      this.setData({
        user:res,
        uid: res.id,
        logo: res.image || this.data.logo
      })
    })
  },
  onReady: function () {
    this._getGoodByUid(this.data.uid)
  },
  _getGoodByUid(uid){
    getGoodByUid(uid).then(res=>{
      let good = normalGoods(res)
      let goods = this.data.goods.concat(good)
      this.setData({
        goods,
        total: good.length
      })
    })
  },
  onSelectGood(event){
    const gid = event.currentTarget.dataset.gid
    app.navigateTo({
      url: '/pages/help-detail/help-detail',
      success:  (res) => {
        res.eventChannel.emit('selectGood', gid)
      }
    })
  }
})