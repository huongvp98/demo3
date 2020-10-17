import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function index(props) {
  const { auth, onLogin, updateData } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    const param = {
      matKhau: password,
      taiKhoan: username.trim(),
    };
    onLogin(param).then((s) => {
      if (s.code === 0) {
        updateData({ auth: s.data });
        window.location.href = '/';
      }
    });
  };
  useEffect(() => {
    if (auth) {
      window.location.href = '/';
    }
  });
  return (
    <div>
      <Form>
        <Form.Item label="Tên tài khoản">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" onClick={login}>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    auth: { auth },
  } = state;
  return { auth };
};
const mapDispathToProps = ({ auth: { onLogin, updateData } }) => ({
  onLogin,
  updateData,
});
export default connect(mapStateToProps, mapDispathToProps)(index);
