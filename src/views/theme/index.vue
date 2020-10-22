<template>
  <div class="app-container">
    <div class="header-box">
      <el-row class="right-row">
        <el-button
          type="primary"
          style="margin: 0 0 20px 20px"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="onAdd"
        >添加文章</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table
        v-loading="listLoading"
        :data="posts"
        element-loading-text="Loading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="column.name" label="栏目" />
        <el-table-column prop="author.username" label="作者" />
        <el-table-column prop="status" label="状态" align="center" />
        <el-table-column prop="viewCount" label="点击" align="center" />
        <el-table-column prop="replyCount" label="回复" align="center" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column prop="publishAt" label="发布时间" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="onEdit(row)">编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="onDelete(row)"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="edit"
      :close-on-click-modal="false"
      :title="editForm.id > 0 ? '编辑栏目' : '添加栏目'"
    >
      <el-form size="small" label-width="120px" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="editForm.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editForm.sort" style="width: 90%" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
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
import { queryPosts } from '@/api/post'

export default {
  name: 'PostManager',
  data() {
    return {
      listLoading: true,
      posts: [],
      edit: false,
      editForm: {

      },
      pager: { page: 1, pageSize: 10 },
      total: 0
    }
  },
  created() {
    this.renderList()
  },
  methods: {
    renderList() {
      this.listLoading = true
      queryPosts(this.pager).then(resp => {
        this.posts = resp.data.items
        this.total = resp.data.total
        this.listLoading = false
      })
    },
    onAdd() {
      this.editForm = {}
      this.edit = true
    },
    onEdit(column) {
      this.editForm = column
      this.edit = true
    },
    onCancel() {
      this.edit = false
    },
    onSubmit() {

    },
    onDelete(column) {
      this.$confirm('确认删除？', {
        closeOnPressEscape: false,
        closeOnClickModal: false
      }).then(() => {
        // deleteColumn(column).then((resp) => {
        //   this.renderList()
        // })
      })
    },
    handleSelectionChange(rows) {
      console.log(rows)
    }
  }
}
</script>
