import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/pages/Index.module.scss";

const Index = (): JSX.Element => {
  let titleStr = "welcome to\nosayubot.com";

  const [count, setCount] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (count === 0) {
      const timerId = setInterval(() => {
        countUp();
      }, 100);
      setIntervalId(timerId);
    }
    if (count > titleStr.length + 1) {
      clearInterval(intervalId);
    }
  }, [count]);

  const countUp = () => {
    setCount((count) => count + 1);
  };

  const year = new Date().getFullYear();

  const description = [
    "モバイルアプリ開発を機にプログラミングにハマる。",
    "現在は大学生の傍、フリーランスエンジニアとして複数の業務委託を請け負っている。",
  ];
  const skills = [
    "JavaScript",
    "TypeScript",
    "firebase",
    "Vue",
    "Nuxt.js",
    "React",
    "Next.js",
    "React Native",
    "Google App Script",
    "Node.js",
    "python",
    "SQL",
    "GitHub",
    "verecel",
    "C言語",
    "Java",
  ];

  return (
    <div className={styles.container}>
      <code className={styles.code}>
        {<span>{titleStr.slice(0, count + 1)}</span>}
      </code>
      <br />
      <div className={styles.icon}>
        <Image src="/icon.png" alt="osayu" width={216} height={216} />
      </div>
      <div className={styles.profile}>
        <div className={styles.name}>
          <h1>おさゆ</h1>
          <Image src="/status/uni.png" alt="お茶情" width={72} height={36} />
          &nbsp;
          {year === 2021 && (
            <Image src="/status/B4.png" alt="B4" width={40} height={36} />
          )}
          {year === 2022 && (
            <Image src="/status/B4.png" alt="M1" width={40} height={36} />
          )}
          {year === 2023 && (
            <Image src="/status/B4.png" alt="M2" width={40} height={36} />
          )}
          {year > 2023 && (
            <Image src="/status/B4.png" alt="卒業" width={60} height={36} />
          )}
        </div>

        <div className={styles.description}>
          <p>
            お茶の水女子大学情報科学科 &rarr;
            お茶の水女子大学大学院理学専攻人間文化創成科学研究科
          </p>
          {description.map((text) => {
            return <p key={text}>{text}</p>;
          })}
        </div>
        <div className={styles.description}>
          <h4>扱える言語や技術</h4>
          <p>
            {skills.map((skill, index) => {
              return (
                <span key={index}>
                  {skill}
                  {index === skills.length - 1 ? " など" : "、"}
                </span>
              );
            })}
          </p>
        </div>
        <Link href="https://github.com/osayubot">
          <a className={styles.social}>
            <Image
              src="/social/github.png"
              alt="github"
              width={45}
              height={45}
            />
          </a>
        </Link>
        <Link href="https://twitter.com/osayubot">
          <a className={styles.social}>
            <Image
              src="/social/twitter.png"
              alt="twitter"
              width={50}
              height={50}
            />
          </a>
        </Link>
        <Link href="https://zenn.dev/osayubot">
          <a className={styles.social}>
            <Image src="/social/zenn.png" alt="zenn" width={45} height={45} />
          </a>
        </Link>

        <div className={styles.grid}>
          <Link href="/profile">
            <a className={styles.card}>
              <h2>プロフィール &rarr;</h2>
              <p>おさゆのプロフィール</p>
            </a>
          </Link>
          <Link href="/blog">
            <a className={styles.card}>
              <h2>日記 &rarr;</h2>
              <p>技術記事や日記です</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
