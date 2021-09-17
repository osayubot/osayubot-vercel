import Link from "next/link";
import styles from "../styles/pages/Error.module.scss";

const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1>Error</h1>
      <h1 className={styles.errorCode}>404</h1>
      <br />
      <h3>エラー</h3>

      <p>ページが見つかりませんでした</p>
      <Link href="/">
        <a>トップページへ戻る</a>
      </Link>
    </div>
  );
};

export default ErrorPage;
