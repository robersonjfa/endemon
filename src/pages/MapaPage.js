import '../App.css';
import React from 'react';
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import {
  MonitorOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import Mapa from './Mapa'

const { confirm } = Modal;
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MapaPage = () => {
  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  function showExitConfirm() {
    confirm({
      title: 'Sair',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja realmente sair?',
      onOk() {
        window.api.send("toMain", { funcao: "exit" });
      },
      onCancel() {

      },
    });
  }

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
          <Menu.Item key="8" icon={<LogoutOutlined />} onClick={showExitConfirm}>
            Sair
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Monitoramento</Breadcrumb.Item>
            <Breadcrumb.Item>Registro de casos</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Mapa location={location} zoomLevel={17} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MapaPage;