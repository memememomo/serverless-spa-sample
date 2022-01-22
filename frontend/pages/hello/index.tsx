import {useEffect, useState} from "react";
import {getHello} from "../../src/api";
import {handleError} from "../../src/error";
import Layout from "../../components/layout";
import ErrorMessage from "../../components/error-message";
import AuthCheck from "../../components/auth-check";


const Hello = () => {
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 画面が表示されたときに実行される
  useEffect(() => {
    const f = async () => {
      try {
        // APIでHelloメッセージを取得する
        const res = await getHello();
        setMessage(res.message);
      } catch (err) {
        handleError(err, setErrorMessage);
        setMessage('');
      }
    };
    f();
  });

  // 読込中のLoading表示
  if (message === '') return <div>Loading...</div>

  // Helloメッセージを表示
  return (
    <Layout title="メッセージ">
      <ErrorMessage message={errorMessage}/>
      <h2 style={{ textAlign: 'center' }}>{message}</h2>
    </Layout>
  )
};

// ログインが必須の画面のため、AuthCheckコンポーネントで囲って、ログインチェックをする
const HelloAuth = () => {
  return <AuthCheck><Hello/></AuthCheck>
}

export default HelloAuth;