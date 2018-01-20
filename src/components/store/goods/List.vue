<template>
  <div>
    <div class="section">
      <div class="wrapper">
          <div class="wrap-box">
              <!--类别菜单-->
              <div class="left-220" style="margin:0;">
                  <div class="banner-nav">
                      <ul>
                          <li v-for="item in top.catelist" :key="item.id">
                              <h3>
                                  <i class="iconfont icon-arrow-right"></i>
                                  <span>{{item.title}}</span>
                                  <p>
                                    <span v-for="subcates in item.subcates" :key="subcates.id">
                                      {{subcates.title}}
                                    </span>
                                  </p>
                              </h3>
                              <div class="item-box">
                                  <dl>
                                      <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                      <dd>
                                        <!-- <span v-for="subcates in item.subcates" :key="subcates.id">
                                          {{subcates.title}}
                                        </span> -->
                                        <app-category :list="item.subcates"></app-category>
                                      </dd>
                                  </dl>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
              <!--/类别菜单-->
              
              <!--幻灯片-->
              <div class="left-705">
                  <div class="banner-img">
                      <el-carousel :interval="5000" arrow="always" height="341px">
                        <el-carousel-item v-for="item in top.sliderlist" :key="item.id">
                          <img :src="item.img_url" alt="">
                      <h3>{{ item.title }}</h3>
                        </el-carousel-item>
                      </el-carousel>
                  </div>
              </div>
              <!--/幻灯片-->
              
              <!--推荐商品-->
              <div class="left-220">
                  <ul class="side-img-list">
                      <li v-for="(item,index) in top.toplist" :key="index">
                          <div class="img-box">
                              <label>{{index+1}}</label>
                              <img :src="item.img_url">
                          </div>
                          <div class="txt-box">
                              <router-link :to="{name:'detail',params:{id:item.id}}">{{item.title}}</router-link>
                              <span>{{item.add_time | date}}</span>
                          </div>
                      </li>
                  </ul>
              </div>
              <!--/推荐商品-->
          </div>
      </div>
    </div>
    <div class="section" v-for="item in list" :key="item.level1cateid">
      <!--子类-->
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <router-link to="" v-for="subitem in item.level2catelist" :key="subitem.level2catelist">{{subitem.subcatetitle}}</router-link>
          <router-link to="">更多<i>+</i></router-link>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="subitem in item.datas" :key="subitem.artID">
              <router-link :to="{name:'detail',params:{id:subitem.artID}}">
                <div class="img-box">
                  <img :src="subitem.img_url">
                </div>
                <div class="info">
                  <h3>{{subitem.artTitle}}</h3>
                  <p class="price">
                    <b>¥{{subitem.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{subitem.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{subitem.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appCategory from "./common/category";

export default {
  components: {
    appCategory
  },
  data() {
    return {
      top: {
        catelist: [],
        sliderlist: [],
        toplist: []
      },
      list: [
        {
          level1cateid: "",
          catetitle: "",
          datas: [],
          level2catelist: []
        }
      ]
    };
  },
  methods: {
    goodsTopData() {
      this.$http.get(this.$api.goodsTop).then(res => {
        console.log(res.data.message.sliderlist);
        res.data.message.sliderlist.forEach((v, i) => {
          res.data.message.sliderlist[i].img_url = v.img_url.replace(
            /127.0.0.1:8899/,
            "111.230.36.92:8888/"
          );
        });
        res.data.message.toplist.forEach((v, i) => {
          res.data.message.toplist[i].img_url = v.img_url.replace(
            /127.0.0.1:8899/,
            "111.230.36.92:8888/"
          );
        });
        this.top = res.data.message;
      });
    },
    getgoodsgroup() {
      this.$http.get(this.$api.goodsContent).then(res => {
        res.data.message.forEach((v, i) => {
          v.datas.forEach((v2, i2) => {
            v2.img_url = v2.img_url.replace(
              /127.0.0.1:8899/,
              "111.230.36.92:8888/"
            );
          });
        });
        this.list = res.data.message;
      });
    }
  },
  created() {
    this.goodsTopData();
    this.getgoodsgroup();
  }
};
</script>

<style scoped lang="less">
img {
  height: 100%;
  display: block;
}
</style>