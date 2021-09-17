import Image from "next/image";
import styles from "../styles/pages/Profile.module.scss";

const ProfilePage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2>基本情報</h2>
        <h3>kai sayuri@osayu</h3>
        <p>兵庫県出身・東京都在住</p>
        <p>2018年 宮崎県立宮崎西高校卒業</p>
        <p>2022年 お茶の水女子大学理学部情報科学学科卒業予定</p>
        <p>
          2023年 お茶の水女子大学大学院理学専攻人間文化創成科学研究科入学予定
        </p>
      </div>
      <div className={styles.section}>
        <h2>大学でやっていること</h2>
        <h3>伊藤研＠お茶の水女子大学</h3>
        <p>可視化の研究</p>
      </div>
      <div className={styles.section}>
        <h2>趣味</h2>
        <h3>プログラミング</h3>
        <p>競プロ始めたい</p>
      </div>

      <div className={styles.section}>
        <h2>最後に一言</h2>
        <p></p>
        <p>
          大学に入学した時はプログラミングに全くといっていいほど興味を持てなかった私が、個人開発を機に休日もプログラムを書いてしまうほどプログラミングが大好きになりました！
          <br />
          おかげで毎日楽しく仕事ができています！
        </p>
      </div>

      <p>2021年9月17日に更新</p>
    </div>
  );
};

export default ProfilePage;
