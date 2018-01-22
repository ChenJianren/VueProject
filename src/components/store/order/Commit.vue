<template>
  <div>
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
        <!--购物车头部-->
        <div class="cart-head clearfix">
          <h2>
            <i class="iconfont icon-cart"></i>我的购物车</h2>
          <div class="cart-setp">
            <ul>
              <li class="first active">
                <div class="progress">
                  <span>1</span>
                  放进购物车
                </div>
              </li>
              <li class="active">
                <div class="progress">
                  <span>2</span>
                  填写订单信息
                </div>
              </li>
              <li class="last">
                <div class="progress">
                  <span>3</span>
                  支付/确认订单
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--购物车头部-->
        <div class="cart-box">
          <h2 class="slide-tit">
            <span>1、收货地址</span>
          </h2>
          <form id="orderForm" name="orderForm" @submit.prevent="submit">
            <div class="form-box address-info">
              <dl class="form-group">
                <dt>收货人姓名：</dt>
                <dd>
                  <input name="book_id" id="book_id" type="hidden" value="0">
                  <input v-model="formData.accept_name" name="accept_name" id="accept_name" type="text" class="input" value="" datatype="s2-20" sucmsg=" ">
                  <span class="Validform_checktip">*收货人姓名</span>
                </dd>
              </dl>
              <dl class="form-group">
                <dt>所属地区：</dt>
                <dd>
                  <v-distpicker @selected="formData.area = $event"></v-distpicker>
                </dd>
              </dl>
              <dl class="form-group">
                <dt>详细地址：</dt>
                <dd>
                  <input v-model="formData.address" name="address" id="address" type="text" class="input" value="" datatype="*2-100" sucmsg=" ">
                  <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                </dd>
              </dl>
              <dl class="form-group">
                <dt>手机号码：</dt>
                <dd>
                  <input v-model="formData.mobile" name="mobile" id="mobile" type="text" class="input" value="" datatype="m" sucmsg=" ">
                  <span class="Validform_checktip">*收货人的手机号码</span>
                </dd>
              </dl>
              <dl class="form-group">
                <dt>电子邮箱：</dt>
                <dd>
                  <input v-model="formData.email" name="email" id="email" type="text" class="input" value="">
                  <span class="Validform_checktip">方便通知订单状态，非必填</span>
                </dd>
              </dl>
              <dl class="form-group">
                <dt>邮政编码：</dt>
                <dd>
                  <input v-model="formData.post_code" name="post_code" id="post_code" type="txt" class="input code">
                  <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                </dd>
              </dl>
            </div>
            <h2 class="slide-tit">
              <span>2、支付方式</span>
            </h2>
            <ul class="item-box clearfix">
              <!--取得一个DataTable-->
              <li>
                <label>
                   <el-radio v-model="formData.payment_id" label="6">在线支付</el-radio>
                </label>
              </li>
            </ul>
            <h2 class="slide-tit">
              <span>3、配送方式</span>
            </h2>
            <ul class="item-box clearfix">
              <!--取得一个DataTable-->
              <li>
                <label>
                   <el-radio v-model="formData.express_id" label="1">顺丰快递</el-radio>
                </label>
              </li>
              <li>
                <label>
                   <el-radio v-model="formData.express_id" label="2">圆通快递</el-radio>
                </label>
              </li>
              <li>
                <label>
                   <el-radio v-model="formData.express_id" label="3">韵达快递</el-radio>
                </label>
              </li>
            </ul>
            <h2 class="slide-tit">
              <span>4、商品清单</span>
            </h2>
            <div class="line15"></div>
            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
              <tbody>
                <tr>
                  <th colspan="2" align="left">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="84" align="center">购买数量</th>
                  <th width="104" align="left">金额(元)</th>
                </tr>
                <tr v-for="item in shopcart" :key="item.id">
                  <td width="68">
                    <a target="_blank" href="/goods/show-89.html">
                      <img :src="item.img_url" class="img">
                    </a>
                  </td>
                  <td>
                    <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                  </td>
                  <td>
                    <span class="red">
                      ￥{{item.sell_price}}.00
                    </span>
                  </td>
                  <td align="center">{{item.buycount}}</td>
                  <td>
                    <span class="red">
                      ￥{{item.totalamount}}.00
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="line15"></div>
            <h2 class="slide-tit">
              <span>5、结算信息</span>
            </h2>
            <div class="buy-foot clearfix">
              <div class="left-box">
                <dl>
                  <dt>订单备注(100字符以内)</dt>
                  <dd>
                    <textarea v-model="formData.message" name="message" class="input" style="height:35px;"></textarea>
                  </dd>
                </dl>
              </div>
              <div class="right-box">
                <p>
                  商品
                  <label class="price">{{total}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                  <label id="goodsAmount" class="price">{{totalSum}}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p>
                  运费：￥
                  <label id="expressFee" class="price">{{yunfei}}.00</label> 元
                </p>
                <p class="txt-box">
                  应付总金额：￥
                  <label id="totalAmount" class="price">{{Sum}}.00</label>
                </p>
                <p class="btn-box">
                  <a class="btn button" href="/cart.html">返回购物车</a>
                  <input id="btnSubmit" name="btnSubmit" type="submit" value="确认提交" class="btn submit">
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      expressPrice: {
        1: 20,
        2: 15,
        3: 10
      },
      ids: null,
      shopcart: [],
      formData: {
        payment_id: "6",
        express_id: "1"
      }
    };
  },
  computed: {
    total() {
      return this.shopcart.reduce((sum, v) => sum + v.buycount, 0);
    },
    totalSum() {
      return this.shopcart.reduce(
        (sum, v) => sum + v.buycount * v.sell_price,
        0
      );
    },
    yunfei() {
      return this.expressPrice[this.formData.express_id];
    },
    Sum() {
      return this.totalSum + this.yunfei;
    }
  },
  methods: {
    submit() {
      this.formData.goodsAmount = this.Sum;
      this.formData.expressMoment = this.yunfei;
      this.formData.goodsids = this.ids;
      // this.formData.cargoodsobj = this.ids.split(',').reduce( (obj, id) => { obj[id] = 5; return obj; }, {} );
      var obj = {};
      this.shopcart.forEach(v => {
        obj[v.id] = v.buycount;
      });
      this.formData.cargoodsobj = obj;
      this.$http.post(this.$api.orderSubmit, this.formData).then(res => {
        if (res.data.status == 0) {
          this.$alert("提交订单成功！").then(() => {
            this.$router.push({
              name: "pay",
              params: { id: res.data.message.orderid }
            });
          });
        }
      });
    },
    getshopcart() {
      this.$http.get(this.$api.orderList + this.ids).then(res => {
        res.data.message.map(v => {
          v.img_url = v.img_url.replace(
            /127.0.0.1:8899/,
            "111.230.36.92:8888/"
          );
          v.buycount = this.$store.state.shopping[v.id];
        });
        this.shopcart = res.data.message;
      });
    }
  },
  created() {
    this.ids = this.$route.params.ids;
    this.getshopcart();
  }
};
</script>

<style scoped>

</style>