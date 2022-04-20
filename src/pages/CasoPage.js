import '../App.css';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Table, Tooltip, Button, Space, Modal } from 'antd';
import {
  MonitorOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  UserOutlined,
  PlusCircleOutlined,
  DeleteRowOutlined
} from '@ant-design/icons';
const { confirm } = Modal;
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;



const CasoPage = () => {
  const [casos, getCasos] = useState([]);

  const columns = [
    {
      title: 'Pessoa',
      dataIndex: 'codpes',
      key: 'codpes',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Latitude',
      dataIndex: 'latcas',
      key: 'latcas',
    },
    {
      title: 'Longitude',
      dataIndex: 'lngcas',
      key: 'lngcas',
    },
    {
      title: 'Ação',
      key: 'acao',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<DeleteRowOutlined />}
            onClick={(e) => { deleteCaso(record.codcas, e); }}
          />
        </Space>
      ),
    },
  ];

  const fetchCasos = () => {
    fetch("https://app-tests-rjfa.herokuapp.com/casos")
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getCasos(res)
      })
  }

  const deleteCaso = (codcas, e) => {
    e.preventDefault();
    console.log("teste ..." + codcas);
    fetch("https://app-tests-rjfa.herokuapp.com/casos/" + codcas, { method: 'DELETE' })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getCasos(res)
      })
  }

  useEffect(() => {
    fetchCasos()
  }, [])

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
            <Table columns={columns} dataSource={casos} />
            <Tooltip title="registrar">
              <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} size="large" />
            </Tooltip>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CasoPage;