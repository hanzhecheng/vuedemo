import { otherRouter } from '@/router'
///otherrouter为所有的路由，根据roles筛选用户可用的路由
function filterRouter(roles, otherRouter) {
    let router = otherRouter.filter(item => {
        if (ifHasPermission(roles, item)) {
            if (item.children && item.children.length) {
                item.children = filterRouter(roles, item.children);
            }
            return true;
        }
        return false;
    })
    return router;
}
///roles为用户有的权限
function ifHasPermission(roles, router) {
    return roles.some(item => (item.FUNCTIONID === router.path || '/' + item.FUNCTIONID === router.path))
}
const permission = {
    state: {
        permissionRouter: []
    },
    mutations: {
        SET_ROUTER(state, router) {
            state.permissionRouter = router;
        }
    },
    actions: {
        GetPermissionRouter({ commit }, roles) {
            return new Promise((resole, reject) => {
                let returnRouter = otherRouter;//filterRouter(roles, otherRouter)
                //let returnRouter = roles.findIndex(item => item.FUNCTIONID == 'System') !== -1 ? otherRouter : filterRouter(roles, otherRouter);

                let vue404 = otherRouter.find(item => item.name == '404');
                if (vue404) {
                    returnRouter.push(vue404);
                }
                resole(returnRouter);
            })
        }
    }
}
export default permission;