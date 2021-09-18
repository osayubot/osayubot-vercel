import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const Navbar = (): JSX.Element => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
      <div className="navbar">
        <Link href="/">
          <a className="top">osayubot</a>
        </Link>
        <div className="icon" onClick={toggleMenu}>
          {menuOpen ? (
            <Image src="/close.svg" alt="x" width={50} height={50} />
          ) : (
            <Image src="/menu.svg" alt="≡" width={50} height={50} />
          )}
        </div>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <Link href="/">
            <a>Top</a>
          </Link>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </div>
      </div>
    );
  };

  const Footer = (): JSX.Element => {
    return (
      <footer className="footer">
        <Link href="/">
          <a>
            powered by &nbsp;<b>＠osayubot</b>
          </a>
        </Link>
      </footer>
    );
  };

  return (
    <div className="container">
      <Head>
        <title>osayubot</title>
        <meta property="og:url" content="https://osayubot.vercel.app" />
        <meta property="og:title" content="osayubot" />
        <meta name="description" content="kai sayuri @osayu のプロフィール" />
        <meta property="og:site_name" content="osayubot" />
        <meta
          property="og:description"
          content="kai sayuri @ osayu のプロフィールサイト"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="main">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
