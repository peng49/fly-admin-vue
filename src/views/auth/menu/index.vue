<template>
  <div class="app-container">
    <div class="header-box">
      <el-row class="right-row">
        <el-button type="primary" style="margin:0 0 20px 20px;" size="mini" icon="el-icon-circle-plus-outline" @click="openForm">添加菜单</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table
        v-loading="listLoading"
        :data="menuTree"
        element-loading-text="Loading"
        border
        row-key="id"
        fit
        highlight-current-row
      >
        <!-- <el-table-column prop="id" label="ID" /> -->
        <el-table-column prop="title" label="菜单" />
        <el-table-column label="图标" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="序号" />
        <el-table-column prop="createdAt" label="创建时间" align="center" />
        <el-table-column prop="updatedAt" label="更新时间" align="center" />
        <el-table-column label="操作">
          <el-button size="mini">编辑</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- <editForm v-bind.sync="dialogEditOption" /> -->
</template>

<script>
import request from '@/utils/request'
// import { editForm } from './dialog/editForm'

export default {
  // components: { editForm },
  data() {
    return {
      listLoading: true,
      dialogEditOption: {
        open: false,
        data: {}
      },
      menus: [],
      menuTree: []
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    hasChild(parent) {
      for (const i in this.menus) {
        const menu = this.menus[i]
        if (menu.parentId === parent.id) {
          return true
        }
      }
      return false
    },
    getChildren(parent) {
      const items = []
      for (const i in this.menus) {
        const menu = this.menus[i]
        if (menu.parentId === parent.id) {
          items.push(menu)
        }
      }
      return items
    },
    initTree() {
      for (const i in this.menus) {
        const menu = this.menus[i]
        if (menu.parentId !== 0) {
          continue
        }

        if (this.hasChild(menu)) {
          menu.children = this.getChildren(menu)
        }
        this.menuTree.push(menu)
      }
      this.listLoading = false
    },
    getMenus() {
      const _this = this
      _this.menus = []
      _this.menuTree = []
      request({ url: 'http://localhost:8080/api/auth/menus', method: 'get' })
        .then(function(resp) {
          _this.menus = resp.data
          _this.initTree()
        })
    },
    openForm() {
      this.open = true
    }
  }
}
</script>
