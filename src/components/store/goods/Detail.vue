<template>
  <div>
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <router-link :to="{name:'index'}">首页</router-link> &gt;
        <router-link :to="{name:'list'}">购物商城</router-link>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <detail-view :imglist="goods.imglist"></detail-view>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1>{{goods.goodsinfo.title}}</h1>
                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}.00</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{goods.goodsinfo.sell_price}}.00</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <el-input-number v-model="num1" size="mini" :max="goods.goodsinfo.stock_quantity"></el-input-number>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <button class="buy" >立即购买</button>
                        <button class="add" @click="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <el-tabs type="border-card">
                <el-tab-pane label="商品介绍">
                  <div class="tab-content entry" style="display:block;" v-html="goods.goodsinfo.content"></div>
                </el-tab-pane>
                <el-tab-pane label="商品评论">
                  <Comment tablename="goods"></Comment>
                </el-tab-pane>
              </el-tabs>
              <!--/选项卡-->
            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">

                  <li v-for="item in goods.hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link :to="{name:'detail',params:{id:item.id}}">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="{name:'detail',params:{id:item.id}}">
                        {{item.title}}
                      </router-link>
                      <span>{{item.add_time | date}}</span>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailView from "./common/DetailView";
import Comment from "./common/Comment";
export default {
  data() {
    return {
      num1: 0,
      id: this.$route.params.id,
      goods: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  methods: {
    getDetailById() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        res.data.message.hotgoodslist.forEach((v, i) => {
          v.img_url = v.img_url.replace(
            /127.0.0.1:8899/,
            "111.230.36.92:8888/"
          );
        });
        res.data.message.imglist.forEach((v, i) => {
          v.thumb_path = v.thumb_path.replace(
            /127.0.0.1:8899/,
            "111.230.36.92:8888/"
          );
        });
        this.goods = res.data.message;
      });
    },
    add() {
      this.$store.commit("modifyShopping", {
        id: this.id,
        count: this.num1 * this.goods.goodsinfo.sell_price
      });
    }
  },
  created() {
    this.getDetailById();
  },
  watch: {
    $route() {
      // console.log(this.$route.params.id);
      this.id = this.$route.params.id;
      this.getDetailById();
    }
  },
  components: {
    DetailView,
    Comment
  }
};
</script>

<style scoped>

</style>