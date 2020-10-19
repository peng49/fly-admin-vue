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
        >添加用户</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table
        v-loading="listLoading"
        :data="users"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="avatar" label="图像" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column prop="updatedAt" label="更新时间" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="onEdit(row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="edit" :close-on-click-modal="false" :title="editForm.id > 0?'编辑用户':'添加用户'">
      <el-form size="small" label-width="80px" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" style="width: 90%" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editForm.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="editForm.password"
            type="password"
            style="width: 90%"
          />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="editForm.confirmPassword" style="width: 90%" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.roleIds" multiple style="width: 90%">
            <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="editForm.confirmPassword" style="width: 90%" />
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
import { getUsers, addUser, editUser, deleteUser } from '@/api/admin/user'
import { getRoles } from '@/api/admin/role'

export default {
  name: 'AdminUserManager',
  data() {
    return {
      listLoading: true,
      users: [],
      roles: [],
      edit: false,
      editForm: {}
    }
  },
  created() {
    this.renderList()
    this.getRoles()
  },
  methods: {
    renderList() {
      getUsers().then((resp) => {
        this.users = resp.data
        this.listLoading = false
      })
    },
    getRoles() {
      getRoles().then(resp => {
        this.roles = resp.data
      })
    },
    onAdd() {
      this.edit = true
      this.editForm = {}
    },
    onEdit(user) {
      this.edit = true
      this.editForm = user
    },
    onDelete(row) {
      this.$confirm('确认删除？', {
        closeOnPressEscape: false,
        closeOnClickModal: false
      }).then(() => {
        deleteUser(row).then((resp) => {
          this.renderList()
        })
      })
    },
    onCancel() {
      this.edit = false
    },
    onSubmit() {
      console.log(this.editForm)
      let res
      if (this.editForm.id > 0) {
        res = editUser(this.editForm)
      } else {
        res = addUser(this.editForm)
      }
      res.then((resp) => {
        console.log(resp)
        this.edit = false
        this.renderList()
      })
    }
  }
}
</script>
