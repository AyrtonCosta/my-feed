import { useEffect, useState } from "react";
import { getPostList } from "../services/postsService";

import Feed from "../components/Feed";
import PostForm from "../components/PostForm";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loasPosts() {
      try {
        const postList = await getPostList();

        if (!postList) {
          setHasError(true);
          return;
        }

        setPosts(postList);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loasPosts();
  }, []);

  function handleSubmit({ history, userName }) {
    setPosts([
      ...posts,
      {
        id: Math.random(),
        content: history,
        userName,
        publishedAt: new Date(),
      },
    ]);
  }

  return (
    <>
      <PostForm onSubmit={handleSubmit} />

      <main>
        <Feed
          hasError={hasError}
          isLoading={isLoading}
          posts={posts}
          title="Seu Feed"
          subtitle="Acompanhe o que seus amigos estão pensando em tempo real"
        />
      </main>
    </>
  );
}
