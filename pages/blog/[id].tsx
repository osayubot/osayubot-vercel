import { client } from "../../libs/client";
import styles from "../../styles/pages/Blog.module.scss";
import { Blog, GetStaticProps, Data } from "../../types/index";

const BlogId = ({ blog }: { blog: Blog }): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{blog.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
      <p>投稿：{blog.date.slice(0, 10)}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const data: Data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id: string = context.params.id.toString();
  const data: Blog[] = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
