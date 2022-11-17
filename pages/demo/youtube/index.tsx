import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/pages/Youtube.module.scss";

export interface Movie {
  src: string;
  title: string;
  play: string;
  date: string;
  time: string;
  key: number;
}
export const movies: Movie[] = [
  {
    src: "/demo/kirinuki1.png",
    title:
      "正直に言わせてください。伊藤研のゼミは週〇〇です※多くの人が間違えている事実を語ります",
    play: "4万",
    time: "0:31",
    date: "2021/09/28",
    key: 0,
  },
  {
    src: "/demo/kirinuki2.png",
    title:
      "【たかゆき】あなたがスケジュールを知る手段はもうこれしかないです。本当は言いたくなかったけど教えます",
    play: "3万",
    time: "0:25",
    date: "2021/09/28",
    key: 1,
  },
  {
    src: "/demo/kirinuki3.png",
    title:
      "【たかゆき】最低限これだけは知っておいた方が身のためです。「伊藤研は画像処理とかやってるの？」",
    play: "12万",
    time: "0:41",
    date: "2021/09/28",
    key: 2,
  },
  {
    src: "/demo/kirinuki4.png",
    title:
      "【たかゆき】※え？返信速度が光よりも速くなることってあるの？それ信じてる人やばいですよ",
    play: "4万",
    time: "0:25",
    date: "2021/09/28",
    key: 3,
  },
  {
    src: "/demo/kirinuki5.png",
    title: "【たかゆき】※おめでとう※あのハッシュタグがとんでもないことに...",
    play: "2万",
    time: "0;21",
    date: "2021/09/28",
    key: 4,
  },
  {
    src: "/demo/kirinuki6.png",
    title:
      "【たかゆき】※情報科の裏側を暴露※伊藤研が7階から3階へ移動。研修室を移動させた本当の理由",
    play: "1万",
    time: "0:17",
    date: "2021/09/28",
    key: 5,
  },
  {
    src: "/demo/kirinuki7.png",
    title:
      "【たかゆき】向いているのは●●な人です。ブラック研究室！？伊藤研について語る",
    play: "6万",
    time: "0:40",
    date: "2021/09/28",
    key: 6,
  },
  {
    src: "/demo/kirinuki8.png",
    title: "【たかゆき】３年生必見！伊藤研からのメッセージ",
    play: "8万",
    time: "0:27",
    date: "2021/09/28",
    key: 7,
  },
];
export const channel = {
  name: "たかゆきの切り抜き",
  register: "11010万人",
  tag: "#お茶の水女子大学 #伊藤研",
};

const YouTubePage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>
        <Image src="/demo/thumbnail.png" alt="thumbnail" layout="fill" />
      </div>

      <div className={styles.profile}>
        <Image
          src="/demo/itot.jpg"
          alt="icon"
          width={80}
          height={80}
          className={styles.icon}
        />

        <div className={styles.text}>
          <h2>{channel.name}</h2>
          <p>チャンネル登録者数　{channel.register}</p>
        </div>
      </div>
      <div className={styles.content}>
        <h5>
          アップロード済みの動画
          <Image src="/demo/dropdown.svg" alt="↓" width={32} height={14} />
        </h5>

        {movies.map((item) => {
          return (
            <Link key={item.key} href={`/demo/youtube/play?id=${item.key}`}>
              <a className={styles.section}>
                <div className={styles.image}>
                  <Image
                    src={item.src}
                    alt="youtube"
                    width={320}
                    height={180}
                  />
                  <div className={styles.time}>{item.time}</div>
                </div>
                <h4>{item.title}</h4>
                <p>再生回数：{item.play}回</p>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubePage;
