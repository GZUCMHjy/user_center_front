/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
//控制用戶的訪問權限
//先訪問app.tsx文件 調用initialState()獲取用戶當前信息 作為初始化用戶信息
//接著就作為currentUser的信息 從而在access方法中判斷是否為管理員身份
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    //返回就是一個boolean值
    canAdmin: currentUser && currentUser.userRole === 1,
    //
  };
}
