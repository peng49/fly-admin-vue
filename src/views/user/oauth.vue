<template>
  <div class="app-container">
    <!-- <div class="header-box">
      <el-row class="right-row">
        <el-button
          type="primary"
          style="margin: 0 0 20px 20px"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="onAdd"
        >添加友链</el-button>
      </el-row>
    </div> -->
    <div class="content-box">
      <el-table
        v-loading="listLoading"
        :data="accounts"
        element-loading-text="Loading"
        border
      >
        <el-table-column prop="platform" label="平台" />
        <el-table-column prop="userId" label="用户" />
        <el-table-column prop="openid" label="Openid" align="center" />

        <el-table-column prop="createdAt" label="创建时间" align="center" />
        <el-table-column prop="updatedAt" label="更新时间" align="center" />
        <el-table-column label="操作">
          <!-- <template slot-scope="{ row }">
            <el-button size="mini" @click="onEdit(row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onDelete(row)"
            >删除</el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page.sync="pager.page"
        :page-size="pager.pageSize"
        layout="total, prev, pager, next"
        :total="total"
        @size-change="renderList"
        @current-change="renderList"
      />
    </div>
  </div>
</template>
<script>
import { queryAccounts } from '@/api/oauthAccount'
export default {
  name: 'OauthAccountManage',
  data() {
    return {
      listLoading: true,
      accounts: [],
      pager: { page: 1, pageSize: 15 },
      total: 0
    }
  },
  created() {
    this.renderList()
  },
  methods: {
    renderList() {
      this.listLoading = true
      queryAccounts(this.pager).then(resp => {
        this.accounts = resp.data.items
        this.total = resp.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
