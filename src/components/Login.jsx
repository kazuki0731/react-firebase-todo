import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";

export const Login = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const { signin, signup } = useContext(AuthContext);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signin(email.value, password.value, history);
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <>
      <button onClick={() => setIsLogin(true)}>ログイン</button>
      <button onClick={() => setIsLogin(false)}>新規登録</button>
      {isLogin ? (
        <>
          <h1>ログイン</h1>
          <form onSubmit={handleSubmitLogin}>
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input type="email" name="email" id="email" />
            </div>
            <div>
              <label htmlFor="password">パスワード</label>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <button>ログイン</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmitSignUp}>
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input type="email" name="email" id="email" />
            </div>
            <div>
              <label htmlFor="password">パスワード</label>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <button>登録</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
