import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { channel } from "./youtube";
import styles from "../../styles/pages/Chat.module.scss";

const ChatPage = () => {
  const messageArr = [
    "",
    "お茶子〜〜！[left]",
    "研究室紹介動画見てる〜？[left]",
    "見てる見てる！🥰[right]",
    "どこも研究室の個性が出てて面白いね！ｗｗ[right]",
    "研究室どこがいいのか超迷う〜！[right]",
    "それなーー！😭😭[left]",
    "次で紹介動画ラストだね[left]",
    "お茶子はここの研究室考えてる、みたいなのあるの？[left]",
    "あ、私は伊藤研いいなぁって思ってて！[right]",
    "そうなんだ 😲😲[left]",
    "そうそう！この前ね、[right]",
    "「お茶大 伊藤研」って検索したら[right]",
    "こんなの見つけた！[right]",
    "[kirinuki]",
    "えｗｗなにこれｗｗｗ[left]",
    "YouTubeの切り抜き動画？[left]",
    "そう！伊藤研について、まとめた動画みたい！[right]",
    "すごい参考になったから、よかったら見て！[right]",
    "おお〜〜！！いいね！！ありがとう！[left]",
    "早速見てみる！！[left]",
    "うん！！リンク貼っておくね！[right]",
    "[link]",
  ];

  const [sentMessages, setSentMessages] = useState<string[]>([]); // 送信されたメッセージの配列
  const [count, setCount] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* countが初期値0の時開始 */
    if (count === 0) {
      return startChat();
    }
    /* count数がメッセージ配列の長さと等しくなった時終了 */
    if (count === messageArr.length - 1) {
      clearInterval(timerId);
      setTimerId(null);
    }

    setSentMessages((sentMessage) => [...sentMessage, messageArr[count]]);
  }, [count]);

  const startChat = () => {
    setCount(1);
    setTimerId(
      setInterval(() => {
        //scrollBottomRef?.current?.scrollIntoView();
        setCount((count) => count + 1);
      }, 1800)
    );
  };

  return (
    <div className={styles.container}>
      {sentMessages.map((message, index) => {
        return (
          <div key={index}>
            {message.indexOf("[left]") > -1 && (
              <div className={styles.left}>
                <div className={styles.icon}>
                  <Image
                    width="50"
                    height="50"
                    src="/demo/ochako.png"
                    alt="お茶子"
                  />
                </div>
                <p className={styles.message}>
                  {message.slice(0, message.indexOf("["))}
                </p>
              </div>
            )}
            {message.indexOf("[right]") > -1 && (
              <div className={styles.right}>
                <p className={styles.message}>
                  {message.slice(0, message.indexOf("["))}
                </p>
              </div>
            )}
            {message.indexOf("[kirinuki]") > -1 && (
              <div className={styles.right}>
                <div className={styles.kirinuki}>
                  <Image
                    src="/demo/kirinuki.jpg"
                    alt="youtube"
                    width={320}
                    height={180}
                  />
                  <h3>{channel.name}</h3>
                  <p>{channel.tag}</p>
                  <div className={styles.youtube}>
                    <Image
                      src="/social/youtube.png"
                      alt="youtube"
                      width={80}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            )}
            {message.indexOf("[link]") > -1 && (
              <div className={styles.right}>
                <div className={styles.message}>
                  <Link href="/demo/youtube">
                    <a>{channel.name}</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div ref={scrollBottomRef} />
    </div>
  );
};

export default ChatPage;
