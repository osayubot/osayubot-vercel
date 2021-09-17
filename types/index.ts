import { ParsedUrlQuery } from "querystring";

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string[];
};

export type Data = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type GetStaticProps = (ctx: {
  params?: ParsedUrlQuery;
  preview?: boolean;
  previewData?: any;
}) => Promise<{
  props: { [key: string]: any };
  revalidate?: number | boolean;
}>;
