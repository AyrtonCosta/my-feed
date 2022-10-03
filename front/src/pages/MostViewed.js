import Feed from "../components/Feed";
import { useEffect, useState } from "react";
import { getMostViewedPostList } from "../services/postsService";

export default function MostViewed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loasPosts() {
      try {
        const postList = await getMostViewedPostList();

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

  return (
    <main className="most-viewed">
      <Feed
        hasError={hasError}
        isLoading={isLoading}
        posts={posts}
        title="Mais vistos"
        subtitle="git "
      />
    </main>
  );
}
