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
    <div class="section">
      <!--子类-->
      <div class="main-tit">
        <h2>手机数码</h2>
        <p>

          <a href="/goods/43.html">手机通讯</a>

          <a href="/goods/44.html">摄影摄像</a>

          <a href="/goods/45.html">存储设备</a>

          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">

            <li>
              <a href="/goods/show-91.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200214471783.jpg">
                </div>
                <div class="info">
                  <h3>尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h3>
                  <p class="price">
                    <b>¥3180.00</b>元</p>
                  <p>
                    <strong>库存 10</strong>
                    <span>市场价：
                      <s>3150.00</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-90.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200154277661.jpg">
                </div>
                <div class="info">
                  <h3>佳能（Canon） EOS 700D 单反套机</h3>
                  <p class="price">
                    <b>¥4799.00</b>元</p>
                  <p>
                    <strong>库存 98</strong>
                    <span>市场价：
                      <s>5099.00</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-89.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200119256512.jpg">
                </div>
                <div class="info">
                  <h3>小米（Mi）小米Note 16G双网通版</h3>
                  <p class="price">
                    <b>¥2299.00</b>元</p>
                  <p>
                    <strong>库存 58</strong>
                    <span>市场价：
                      <s>2699.00</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-88.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200059017695.jpg">
                </div>
                <div class="info">
                  <h3>苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</h3>
                  <p class="price">
                    <b>¥5780.00</b>元</p>
                  <p>
                    <strong>库存 198</strong>
                    <span>市场价：
                      <s>6388.00</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-87.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200046589514.jpg">
                </div>
                <div class="info">
                  <h3>华为（HUAWEI）荣耀6Plus 16G双4G版</h3>
                  <p class="price">
                    <b>¥2195.00</b>元</p>
                  <p>
                    <strong>库存 60</strong>
                    <span>市场价：
                      <s>2499.00</s>
                    </span>
                  </p>
                </div>
              </a>
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
      }
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
    }
  },
  created() {
    this.goodsTopData();
  }
};
</script>

<style scoped lang="less">
img {
  height: 100%;
  display: block;
}
</style>