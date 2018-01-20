<template>
  <div class="tab-content" style="display: block;">
    <!--网友评论-->
    <div class="comment-box">
      <!--取得评论总数-->
      <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="comment">
        <div class="avatar-box">
          <i class="iconfont icon-user-full"></i>
        </div>
        <div class="conn-box">
          <div class="editor">
            <textarea v-model="commenttxt" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
            <span class="Validform_checktip"></span>
          </div>
          <div class="subcon">
            <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
            <span class="Validform_checktip"></span>
          </div>
        </div>
      </form>
      <ul id="commentList" class="list-box">
        <p v-if="getListQuery.message.length == 0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
        <li v-for="item in getListQuery.message" :key="item.id">
          <div class="avatar-box">
            <i class="iconfont icon-user-full"></i>
          </div>
          <div class="inner-box">
            <div class="info">
              <span>{{item.user_name}}</span>
              <span>{{item.add_time | date}}</span>
            </div>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
      <!--放置页码-->
      <div class="page-box" style="margin:5px 0 0 62px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="getListQuery.pageIndex"
            :page-sizes="[2, 20, 30, 40]"
            :page-size="getListQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="getListQuery.totalcount">
          </el-pagination>
      </div>
      <!--/放置页码-->
    </div>
    <!--/网友评论-->
  </div>
</template>

<script>
export default {
  props: ["tablename"],
  data() {
    return {
      id: this.$route.params.id,
      getListQuery: {
        pageIndex: 1,
        pageSize: 2,
        totalcount: 0
      },
      commenttxt: ""
    };
  },
  methods: {
    comment() {
      this.$http
        .post(this.$api.comment + this.tablename + "/" + this.id, {
          commenttxt: this.commenttxt
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$alert(res.data.message).then(() => {
              this.commenttxt = "";
              this.getbypage();
            });
          }
        });
    },
    handleSizeChange(val) {
      this.getListQuery.pageIndex = val;
      this.getbypage();
    },
    handleCurrentChange(val) {
      this.getListQuery.pageIndex = val;
      this.getbypage();
    },
    getbypage() {
      this.$http
        .get(this.$api.commentList + this.tablename + "/" + this.id, {
          params: {
            pageIndex: this.getListQuery.pageIndex,
            pageSize: this.getListQuery.pageSize
          }
        })
        .then(res => {
          console.log(res.data);
          this.getListQuery = res.data;
        });
    }
  },
  created() {
    this.getbypage();
  },
  watch: {s
    $route() {
      this.id = this.$route.params.id;
      this.getbypage();
    }
  }
};
</script>

<style scoped>

</style>