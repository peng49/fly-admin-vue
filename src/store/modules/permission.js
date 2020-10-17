import { constantRoutes } from '@/router'
import { getMenu } from '@/api/admin/menu' // 获取路由的接口方法
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */
export function getAsyncRoutes(routes) {
    const res = []
    const keys = ['path', 'name', 'children', 'redirect', 'alwaysShow', 'meta', 'hidden']
    routes.forEach(item => {
        const newItem = {}
        if (item.component) {
            if (item.component === 'layout/Layout') {
                newItem.component = Layout
            } else {
                newItem.component = () => import(`@/${item.component}`)
            }
        }
        for (const key in item) {
            if (keys.includes(key)) {
                newItem[key] = item[key]
            }
        }
        if (newItem.children && newItem.children.length) {
            newItem.children = getAsyncRoutes(item.children)
        }
        res.push(newItem)
    })
    return res
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(async resolve => {
            let accessedRoutes
            const routes = await getMenu() // 获取到后台路由
            const asyncRoutes = getAsyncRoutes(routes.data) // 对路由格式进行处理
            console.log(33, routes, asyncRoutes)
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else { // 这里是有做权限过滤的,如果不需要就不用
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}