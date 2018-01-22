<template>
    <div>
        <!-- 导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'list'}">首页</router-link>&gt;
                <router-link :to="{name:'shopcart'}">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-switch :value="allSeletedState" @change="changeAll" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="item in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch v-model="item.status" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </th>
                                    <th width="84" align="left">
                                        ￥{{item.sell_price}}
                                    </th>
                                    <th width="104" align="center">
                                        <el-input-number @change="handleChange(item.id,$event)" v-model="item.buycount" size="mini" :min="1"></el-input-number>
                                    </th>
                                    <th width="104" align="left">
                                        <td>{{item.sell_price *  item.buycount}}</td>
                                    </th>
                                    <th width="54" align="center">
                                        <el-button size="mini" @click="del(item.id)">删除</el-button>
                                    </th>
                                </tr>

                                <tr v-if="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物吧！</a></p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{total}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{sum}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.push({name:'list'})">继续购物</button>
                            <button class="submit" @click="pay">立即结算</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ids: null,
      goodsList: []
    };
  },
  methods: {
    pay() {
      let ids = this.goodsList
        .filter(v => v.status)
        .map(v => v.id)
        .join(",");
      this.$router.push({ name: "commit", params: { ids } });
    },
    changeAll(boolean) {
      this.goodsList.forEach(v => {
        v.status = boolean;
      });
    },
    del(id) {
      this.goodsList = this.goodsList.filter(v => v.id != id);
      this.$store.commit("delShopping", id);
    },
    handleChange(id, count) {
      this.goodsList.forEach(v => {
        if (v.id == id) {
          v.buycount = count;
        }
      });
      this.$store.commit("modifyShopping", { id, count });
      console.log(this.$store.getters.shopping);
    },
    getGoodsShopcart() {
      this.$http.get(this.$api.shopcartGoods + this.ids).then(res => {
        res.data.message.forEach((v, i) => {
          v.img_url = v.img_url.replace(
            /127.0.0.1:8899/,
            "111.230.36.92:8888/"
          );
          v.status = true;
          v.buycount = this.$store.state.shopping[v.id];
        });
        this.goodsList = res.data.message;
      });
    }
  },
  computed: {
    // 总数 => 遍历商品列表, 如果商品的selected字段为true, 那么累加它的buycount购买数量
    total() {
      return this.goodsList.reduce(
        (total, v) => total + (v.status ? v.buycount : 0),
        0
      );
    },
    sum() {
      return this.goodsList.reduce(
        (total, v) => total + (v.status ? v.buycount * v.sell_price : 0),
        0
      );
    },
    allSeletedState() {
      return this.goodsList.every(v => v.status);
    }
  },
  created() {
    this.ids = this.$store.getters.shoppingIds;
    this.getGoodsShopcart();
  }
};
</script>

<style>

</style>