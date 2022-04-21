import '../App.css';
import { Layout, Form, Input, Button, Alert, Image, Row, Col } from 'antd';
import { useState, useEffect, useRef } from 'react';
const { Header, Content } = Layout;

const LoginPage = () => {

  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const iusuario = useRef(null);

  const validaLogin = () => {
    fetch("http://localhost:4000/usuario/validalogin",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: usuario, senha: senha })
      }
    ).then((res) => res.json()).then((res) => {
      if (res.length === 0) {
        setSuccess(false);
        setError(true)
      } else {
        setSuccess(true);
        setError(false);
      }
    })
  }

  const errorAlert = error ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Falha no Login!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const login = success ? <Row>
    <Col span="8"></Col>
    <Col span="8">
      <Alert message="Sucesso no Login!" type="warning"></Alert>
    </Col>
  </Row> : ''

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const processaLogin = () => {
    // window.api.send("toMain", { funcao: "login", usuario: usuario, senha: senha });
    // window.api.receive("fromMain", (resposta) => {
    //   if (resposta) {
    //     setSuccess(true);
    //     setError(false);
    //   } else {
    //     setSuccess(false);
    //     setError(true);
    //   }
    // });
    validaLogin();
  };

  const salvaUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const salvaSenha = (e) => {
    setSenha(e.target.value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    iusuario.current.focus();
  }, [])

  return (
    <Layout>
      <Header style={{ backgroundColor: 'green' }}><h1>EndeMon - Monitoramento de Endemias como a Dengue</h1></Header>
      <Content>
        <Form
          name="basic"
          style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Image
            width={250}
            preview={false}
            align="center"
            src="assets/logo.png"
          />
          <Form.Item
            label="Usuário"
            name="usuario"
            value={usuario}
            onChange={salvaUsuario}
            rules={[
              {
                required: true,
                message: 'Informe o usuário!'
              },
            ]}
          >
            <Input ref={iusuario} />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            value={senha}
            onChange={salvaSenha}
            rules={[
              {
                required: true,
                message: 'Informe a senha!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {errorAlert}
          {login}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={processaLogin}>
              Acessar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginPage;