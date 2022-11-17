import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/pages/Youtube.module.scss";
import { Movie, movies } from "../youtube";

const YouTubePlayPage = (): JSX.Element => {
  const [movie, setMovie] = useState<Movie>();
  const [unClickedMovies, setUnClickedMovies] = useState<Movie[]>(movies);
  const router = useRouter();

  useEffect(() => {
    const res: Movie[] = movies.filter((item) => {
      return item.key === Number(router.query.id);
    });
    setMovie(res[0]);
    if (unClickedMovies.length === 0) {
      setUnClickedMovies(movies);
    } else {
      const res2: Movie[] = unClickedMovies.filter((item) => {
        return item.key !== Number(router.query.id);
      });
      setUnClickedMovies(res2);
    }
  }, [router]);
  return (
    <div className={styles.container}>
      <div className={styles.imageBg}>
        {movie && <Image src={movie.src} alt="youtube" layout="fill" />}
        {unClickedMovies.length === 0 && (
          <div className={styles.expand}>
            <p>全画面表示する</p>
          </div>
        )}
      </div>
      {movie && (
        <div className={styles.description}>
          <h2>{movie.title}</h2>
        </div>
      )}
      {movie && (
        <div className={styles.description}>
          <p>{movie.date}に投稿</p>
        </div>
      )}

      <div className={styles.list}>
        {unClickedMovies.map((item) => {
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
                <h5>{item.title}</h5>
                <p>再生回数：{item.play}回</p>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default YouTubePlayPage;
