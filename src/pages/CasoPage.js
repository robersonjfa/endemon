import '../App.css';
import React, { useState, useEffect } from 'react';
import { Table, Tooltip, Button, Space } from 'antd';
import {
  PlusCircleOutlined,
  DeleteRowOutlined
} from '@ant-design/icons';

const CasoPage = () => {

  const checkInit = () => {
    console.log("INIT");
    return [];
  };

  const [casos, getCasos] = useState(checkInit());

  const columns = [
    {
      title: 'Pessoa',
      dataIndex: 'codpes',
      key: 'codpes',
      render: text => <a href="/pessoa">{text}</a>,
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
    fetch("https://app-tests-rjfa.herokuapp.com/casos/" + codcas, { method: 'DELETE' })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getCasos(res)
      })
  }

  useEffect(() => {
    console.log("fetch casos")
    fetchCasos()
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={casos} />
      <Tooltip title="registrar">
        <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} size="large" />
      </Tooltip>
    </div>
  );
};

export default CasoPage;