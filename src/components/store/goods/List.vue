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
                            <a href="/goods/show-98.html">{{item.title}}</a>
                            <span>{{item.add_time}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!--/推荐商品-->
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