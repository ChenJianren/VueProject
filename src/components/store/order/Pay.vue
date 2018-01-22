<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <router-link :to="{name:'list'}">首页</router-link>&gt;
        <router-link :to="{name:'pay'}">支付中心</router-link>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{formData.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{formData.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{formData.area}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{formData.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{formData.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>{{formData.message}}</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div id="container">
                  二维码图片
                  <canvas width="300" height="300"></canvas>
                </div>
              </div>
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
      id: null,
      formData: {}
    };
  },
  methods: {
    getPay() {
      this.$http.get(this.$api.order + this.id).then(res => {
        this.formData = res.data.message[0];
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getPay();
  }
};
</script>

<style scoped>

</style>