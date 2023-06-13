import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: {
    postId: string;
  };
};

export const generateStaticParams = async () => {
  const posts = getSortedPostsData();
  return posts.map((post) => {
    return {
      postId: post.id,
    };
  });
};

export const generateMetadata = ({ params }: Params) => {
  const posts = getSortedPostsData();
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);
  console.log(post);

  if (!post) {
    return {
      title: "Not Found",
    };
  }
  return {
    title: post.title,
  };
};

export default async function Post({ params }: Params) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) return notFound();

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  );
}
