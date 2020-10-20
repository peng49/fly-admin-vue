<template>
  <div class="app-container">
    <div class="content-box">
      <el-table
        v-loading="listLoading"
        :data="comments"
        element-loading-text="Loading"
        border
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="commentTime" label="评论时间" />
        <el-table-column label="评论时间">
          <template slot-scope="{ row}">
            <div v-html="row.content" />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              type="danger"
              @click="onDelete(row)"
            >删除</el-button>
          </template>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { deleteComment, queryComment } from '@/api/postComment'

export default {
  data() {
    return {
      listLoading: true,
      comments: [],
      pager: { page: 1, pageSize: 15 },
      total: 0
    }
  },
  created() {
    this.renderList()
  },
  methods: {
    renderList() {
      queryComment(this.pager).then(resp => {
        this.comments = resp.data.items
        this.total = resp.data.total
        this.listLoading = false
      })
    },
    handleSizeChange() {
      this.renderList()
    },
    handleCurrentChange() {
      this.renderList()
    },
    onDelete(comment) {
      this.$confirm('确认删除？', {
        closeOnPressEscape: false,
        closeOnClickModal: false
      }).then(() => {
        deleteComment(comment).then((resp) => {
          this.renderList()
        })
      })
    }
  }
}
</script>
