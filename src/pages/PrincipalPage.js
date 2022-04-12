import '../App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MonitorOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const PrincipalPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="cadastro" icon={<UserOutlined />} title="Cadastro">
            <Menu.Item key="2">Pessoas</Menu.Item>
            <Menu.Item key="3">Residências</Menu.Item>
            <Menu.Item key="4">Armadilhas</Menu.Item>
          </SubMenu>
          <SubMenu key="monitoramento" icon={<MonitorOutlined />} title="Monitoramento">
            <Menu.Item key="5">Registrar Caso</Menu.Item>
            <Menu.Item key="6">Acompanhar Mapa</Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<InfoCircleOutlined />}>
            Sobre
          </Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />}>
            Sair
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrincipalPage;