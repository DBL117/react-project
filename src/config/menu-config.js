/* 
左侧Menu导航的数据配置
*/
// 根据menuList生成<Item>和<SubMenu>组件的数组
import {
  HomeOutlined,
  WalletOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  FormOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TableOutlined,
  LineChartOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/admin/home', // 对应的path
    icon: <HomeOutlined />, // 图标名称
    isPublic: true, // 不需要进行权限检查
  },
  {
    title: '商品',
    key: 'product_about',
    icon: <WalletOutlined />,
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key: '/admin/product_about/category',
        icon: <UnorderedListOutlined />
      },
      {
        title: '商品管理',
        key: '/admin/product_about/product',
        icon: <ToolOutlined />
      },
    ]
  },

  {
    title: '用户管理',
    key: '/admin/user',
    icon: <UserSwitchOutlined />
  },
  {
    title: '角色管理',
    key: '/admin/role',
    icon: <FormOutlined />,
  },

  {
    title: '图表',
    key: 'charts',
    icon: <TableOutlined />,
    children: [
      {
        title: '柱状图',
        key: '/admin/charts/bar',
        icon: <BarChartOutlined />
      },
      {
        title: '折线图',
        key: '/admin/charts/line',
        icon: <LineChartOutlined />
      },
      {
        title: '饼图',
        key: '/admin/charts/pie',
        icon: <PieChartOutlined />
      },
    ]
  },
]

export default menuList