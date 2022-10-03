import errors from "../config/erros";

export async function getPostList() {
  const res = await fetch("http://localhost:3001/posts");

  if (!res.ok) {
    return false;
  }

  const body = await res.json();

  return body.map((post) => ({
    ...post,
    publishedAt: new Date(post.publishedAt),
  }));
}

export async function getMostViewedPostList() {
  const res = await fetch("http://localhost:3001/posts/most-viewed");

  if (!res.ok) {
    return false;
  }

  const body = await res.json();

  return body.map((post) => ({
    ...post,
    publishedAt: new Date(post.publishedAt),
  }));
}

export async function createPost({ history, userName }) {
  const res = await fetch("http://localhost:3002/posts", {
    method: "POST",
    body: JSON.stringify({
      content: history,
      userName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.json();

    return errors[body.code] || "Ocorreu um erro ao cadastrar o post!";
  }

  return true;
}
