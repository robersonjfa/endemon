import { React, } from "react"
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import { Layout, Menu, Modal } from 'antd';
import LoginPage from './pages/LoginPage';
import PrincipalPage from './pages/PrincipalPage';
import CasoPage from './pages/CasoPage';
import MapaPage from './pages/MapaPage';
import {
  MonitorOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import PessoaPage from "./pages/PessoaPage";
const { Footer, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { confirm } = Modal;

const App = () => {

  // sair
  function showExitConfirm() {
    confirm({
      title: 'Sair',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja realmente sair?',
      onOk() {
        window.api.send("toMain", { funcao: "exit" });
      },
      onCancel() { },
    });
  }

  // // rotas do breadcrumb
  // const routes = [
  //   {
  //     path: '/',
  //     breadcrumbName: 'home',
  //   },
  //   {
  //     path: '/',
  //     breadcrumbName: 'Monitoramento',
  //     children: [
  //       {
  //         path: '/casos',
  //         breadcrumbName: 'Registrar Caso',
  //       },
  //       {
  //         path: '/mapa',
  //         breadcrumbName: 'Acompanhar Mapa',
  //       }
  //     ],
  //   }
  // ];

  // function itemRender(route, params, routes, paths) {
  //   const last = routes.indexOf(route) === routes.length - 1;
  //   return last ? (
  //     <span>{route.breadcrumbName}</span>
  //   ) : (
  //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  //   );
  // }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <span>Home</span>
              <Link to="/" />
            </Menu.Item>
            <SubMenu key="cadastro" icon={<UserOutlined />} title="Cadastro">
              <Menu.Item key="2">
                <span>Pessoas</span>
                <Link to="/pessoas" />
              </Menu.Item>
              <Menu.Item key="3">Residências</Menu.Item>
              <Menu.Item key="4">Armadilhas</Menu.Item>
            </SubMenu>
            <SubMenu key="monitoramento" icon={<MonitorOutlined />} title="Monitoramento">
              <Menu.Item key="5">
                <span>Registrar Caso</span>
                <Link to="/casos" />
              </Menu.Item>
              <Menu.Item key="6"> <span>Acompanhar Mapa</span>
                <Link to="/mapa" /></Menu.Item>
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
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={routes} >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <Routes>
              <Route exact path="/" element={<PrincipalPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/casos" element={<CasoPage />} />
              <Route path="/mapa" element={<MapaPage />} />
              <Route path="/pessoas" element={<PessoaPage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            EndeMon - 2022
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;