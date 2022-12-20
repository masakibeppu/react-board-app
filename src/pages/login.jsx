import styles from './login.module.scss';
import {useState, useContext} from 'react';
import {AccountContext} from "./Account"
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const {authenticate} = useContext(AccountContext);

    const handleClickSignup = () => {
        router.push("/signup")
    }

    const onSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password)
         .then(data => {
            console.log("logged in!", data);
            router.push('/boards');
         })
         .catch(err => {
            console.error("Failed to login", err);
         });
    };

    return (
        <div className={styles.App}>
            <div className={styles.title}>ログイン</div>
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </input>
                <div className={styles.buttonWrapper}>
                    <button type="submit">ログイン</button>
                </div>
            </form>
            <div
                className={styles.helpMessage}
                onClick={handleClickSignup}
            >
                アカウントを新しく作る
            </div>
        </div>
    )
};

export default Login;

