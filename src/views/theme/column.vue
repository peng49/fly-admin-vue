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
        >添加栏目</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table
        v-loading="listLoading"
        :data="columns"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="栏目" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="onEdit(row)">编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="onDelete(row)"
            >删除</el-button> -->
            <el-button size="mini" :type="row.status == 1?'danger':'primary'" v-text="row.status == 1?'禁用':'启用'" />
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
  </div>
</template>
<script>
import { addColumn, queryColumn, editColumn, deleteColumn } from '@/api/column'

export default {
  // name: 'ColumnManager',
  data() {
    return {
      listLoading: true,
      columns: [],
      edit: false,
      editForm: {

      }
    }
  },
  created() {
    this.renderList()
  },
  methods: {
    renderList() {
      this.listLoading = true
      queryColumn().then(resp => {
        this.columns = resp.data
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
      let res
      if (this.editForm.id > 0) {
        res = editColumn(this.editForm)
      } else {
        res = addColumn(this.editForm)
      }
      res.then(resp => {
        this.edit = false
        this.renderList()
      })
    },
    onDelete(column) {
      this.$confirm('确认删除？', {
        closeOnPressEscape: false,
        closeOnClickModal: false
      }).then(() => {
        deleteColumn(column).then((resp) => {
          this.renderList()
        })
      })
    }
  }
}
</script>
