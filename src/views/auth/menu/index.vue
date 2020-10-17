<template>
  <div class="app-container">
    <div class="header-box">
      <el-row class="right-row">
        <el-button
          type="primary"
          style="margin: 0 0 20px 20px"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="openForm"
          >添加菜单</el-button
        >
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
          <template slot-scope="{ row }">
            <el-button size="mini" @click="onEdit(row)">编辑</el-button>
            <el-button size="mini" @click="onDelete(row)" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="dialogEditOption.open" title="编辑">
      <el-form size="small" label-width="80px" class="demo-form-inline">
        <el-form-item label="上级菜单">
          <el-cascader
            :options="menuTree"
            :props="{ label: 'title', value: 'id' }"
            change-on-select
            v-model="editForm.parentId"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editForm.title" style="width: 90%" />
        </el-form-item>
        <el-form-item label="Uri">
          <el-input v-model="editForm.uri" style="width: 90%" />
        </el-form-item>
        <el-form-item label="Vue 组件">
          <el-input v-model="editForm.component" style="width: 90%" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="editForm.icon" style="width: 90%" />
        </el-form-item>
        <el-form-item label="序号">
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
import request from "@/utils/request";
import { addMenu, deleteMenu, editMenu } from "@/api/admin/menu";

export default {
  name: "adminMenuManager",
  // components: { editForm },
  data() {
    return {
      listLoading: true,
      dialogEditOption: {
        open: false,
      },
      editForm: {
        parentId: 0,
        title: "",
        uri: "",
        component: "",
        icon: "",
        sort: 0,
      },
      menus: [],
      menuTree: [],
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    hasChild(parent) {
      for (const i in this.menus) {
        const menu = this.menus[i];
        if (menu.parentId === parent.id) {
          return true;
        }
      }
      return false;
    },
    getChildren(parent) {
      const items = [];
      for (const i in this.menus) {
        const menu = this.menus[i];
        if (menu.parentId === parent.id) {
          if (this.hasChild(menu)) {
            menu.children = this.getChildren(menu);
          }
          items.push(menu);
        }
      }
      return items;
    },
    initTree() {
      for (const i in this.menus) {
        const menu = this.menus[i];
        if (menu.parentId !== 0) {
          continue;
        }

        if (this.hasChild(menu)) {
          menu.children = this.getChildren(menu);
        }
        this.menuTree.push(menu);
      }
      this.listLoading = false;
    },
    getMenus() {
      const _this = this;
      _this.menus = [];
      _this.menuTree = [];
      request({
        url: "http://localhost:8080/api/auth/menus",
        method: "get",
      }).then(function (resp) {
        _this.menus = resp.data;
        _this.initTree();
      });
    },
    openForm() {
      this.dialogEditOption.open = true;
    },
    onEdit(menu) {
      this.dialogEditOption.open = true;
      this.editForm = menu;
    },
    onDelete(row) {
      let _this = this;
      this.$confirm("确认删除？", {
        closeOnPressEscape: false,
        closeOnClickModal: false,
      })
        .then(() => {
          deleteMenu(row).then((resp) => {
            _this.getMenus();
          });
        })
        .catch(() => {});
    },
    onCancel() {
      this.dialogEditOption.open = false;
      this.editForm = { parentId: 0 };
    },
    onSubmit() {
      if (this.editForm.parentId.length > 0) {
        this.editForm.parentId = this.editForm.parentId[
          this.editForm.parentId.length - 1
        ];
      } else {
        if (this.editForm.parentId === undefined) {
          this.editForm.parentId = 0;
        }
      }
      console.log(this.editForm);

      let res;

      if (this.editForm.id > 0) {
        res = editMenu(this.editForm);
      } else {
        res = addMenu(this.editForm);
      }
      this.dialogEditOption.open = false;
      res.then((resp) => {
        //刷新列表数据
        this.getMenus();
      });
    },
  },
};
</script>
