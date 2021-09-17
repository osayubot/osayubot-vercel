import Link from "next/link";
import { client } from "../../libs/client";
import { Data, Blog, GetStaticProps } from "../../types/index";
import styles from "../../styles/pages/Blog.module.scss";

const BlogPage = ({ blog }: { blog: Blog[] }): JSX.Element => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a className={styles.body}>
                <h2>{blog.title}</h2>
                <h4>{blog.description}</h4>
                <p>{blog.date.slice(0, 10)}</p>

                <div className={styles.category}>
                  {blog.category.map((category) => {
                    return <span key={category}>{category}</span>;
                  })}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: Data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

export default BlogPage;
