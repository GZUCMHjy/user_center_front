export default [
  {
    path: '/user',
    layout: false,
    //路由 導向頁面路徑
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    //path 頁面路徑
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    //組件 access
    access: 'canAdmin',
    component: './Admin',
    routes: [
      //component是文件路徑
      // { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { path: '/admin/user-manage', name: '用戶管理', icon: 'smile', component: './Admin/UserManage' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
