/**
 * @name umi routing configuration
 * @description only supports path, component, routes, redirect, wrappers, name, icon configuration
 * @param path path only supports two placeholder configurations, the first is in the form of dynamic parameter :id, and the second is * wildcard, which can only appear at the end of the routing string.
 * @param component configures the React component path used for rendering after location and path match. It can be an absolute path or a relative path. If it is a relative path, it will be searched starting from src/pages.
 * @param routes Configure sub-routes, usually used when you need to add layout components to multiple paths.
 * @param redirect configure route jump
 * @param wrappers Configure the packaging component of the routing component. Through the packaging component, you can combine more functions into the current routing component. For example, it can be used for routing-level permission verification.
 * @param name Configure the title of the route. By default, the value of menu.xxxx in the internationalization file menu.ts is read. If the name is configured as Login1, the value of menu.Login1 in menu.ts is read as the title.
 * @param icon Configure the icon of the route. For the value, please refer to https://ant.design/components/icon-cn. Pay attention to removing the style suffix and capitalization. If you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward. or StepBackward, if you want to configure the icon as <UserOutlined />, the value should be user or User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
    {
        path: '/authenticate',
        layout: false,
        routes: [
            {
                name: 'login',
                path: '/authenticate/Login',
                component: './auth/login',
            }
        ],
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
        hideInMenu: true
    },
    {
        path: '/phan-quyen',
        name: 'Phân quyền',
        icon: 'SafetyOutlined',
        // code: 'DANH_MUC',
        // access: 'canAccessMenu',
        routes: [
            // {
            //     path: 'chuc-nang',
            //     name: 'Quản lí chức năng',
            //     component: './permission/function',
            //     // code: 'DM__DMDC',
            //     // access: 'canAccessMenu',
            //     icon: 'SettingOutlined'
            // },
            {
                path: 'nhom',
                name: 'Quản lý nhóm quyền',
                component: './permission/group',
                // code: 'DM__DMDC',
                // access: 'canAccessMenu',
                icon: 'TeamOutlined'
            },
            {
                path: 'du-lieu',
                name: 'Quản lý dữ liệu',
                component: './permission/use-data',
                // code: 'DM__DMDC',
                // access: 'canAccessMenu',
                icon: 'DatabaseOutlined'
            },
            // {
            //     path: 'nguoi-dung',
            //     name: 'Quản lý người dùng',
            //     component: './permission/user',
            //     // code: 'DM__DMDC',
            //     // access: 'canAccessMenu',
            //     icon: 'UserOutlined'
            // },
        ],
    },
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        path: '/ui',
        redirect: '/welcome',
    },
    {
        path: '*',
        layout: false,
        component: './404',
    },
];
