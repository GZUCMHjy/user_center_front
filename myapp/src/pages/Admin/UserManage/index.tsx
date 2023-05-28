
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
// import { Space, Tag } from 'antd';
// import CurrentUser = API.CurrentUser;
// import {request} from "umi";
import {useRef} from "react";
// import {Button, Dropdown} from "antd";
// import {EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";



const columns: ProColumns<API.CurrentUser>[] = [
{
    title: '用户id',
    dataIndex: 'id',
    //是否复制
    copyable: true,
    //是否缩略
    ellipsis: true,
    tip: '标题过长会自动收缩',
    width: '8%',
  },
{
    title: '用户名',
    dataIndex: 'username',
  //是否复制
    copyable: true,
    width: '10%'  ,
},
  {
    title: '用户类型',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum:{
      0: {text:'普通用户',status: 'Default'},
      1: {
        text: '管理员',
        status: 'Success',
      }
    },
    width: '10%'  ,
  },
{
    title: '用户头像',
    dataIndex: 'avatarUrl',
    width: '10%'  ,
    render: (_,record)=>(
      <div>
        <Image src={record.avatarUrl} width={100}/>
      </div>
),
},
{
    title: '性别',
    dataIndex: 'gender',
    width: '10%'  ,
},
{
    title: '电话',
    dataIndex: 'phone',
  //是否复制
    copyable: true,
    width: '10%'  ,
},
{
    title: '账号',
    dataIndex: 'account',
    width: '10%'  ,
},
{
    title: '邮件',
    dataIndex: 'email',
    width: '10%'  ,
  //是否复制
    copyable: true,
},

{
    title: '创建时间',
    dataIndex: 'createTime',
  //声明date类型 否则为字符串类型
    valueType: 'dateTime',
    width: '10%'  ,
},
  {
    title: '状态',
    dataIndex: 'state',
    width: '10%'  ,
    filters: true,
    onFilter: true,
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // @ts-ignore
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      // eslint-disable-next-line react/jsx-no-undef
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },

];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
