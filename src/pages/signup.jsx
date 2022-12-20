import styles from './signup.module.scss';
import {useState} from 'react';
import UserPool from '../UserPool';
import { useRouter } from 'next/router';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleClickLogin = () => {
        router.push('/login');
      }

    const onSubmit = (event) => {
        event.preventDefault();

        console.log(UserPool)
        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            } 
            console.log(data);
        })
    };

    return (
        <div className={styles.App}>
            <div className={styles.title}>アカウント登録</div>
            <form onSubmit={onSubmit}>
            <div className={styles.textFieldText}>メールアドレス</div>
                <input
                    className={styles.textFieldInput}
                    placeholder="メールアドレスを入力してください"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </input>
                <div className={styles.textFieldText}>パスワード</div>
                <input
                    className={styles.textFieldInput}
                    placeholder="パスワードを入力してください"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </input>
                <div className={styles.buttonWrapper}>
                    <button type="submit">新規登録</button>
                </div>
            </form>
            <div
                className={styles.helpMessage}
                onClick={handleClickLogin}
            >
                ログイン画面に戻る
            </div>
        </div>
    )
};

export default Signup;

