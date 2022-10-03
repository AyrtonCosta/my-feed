import userIcon from "../images/user.svg";
import clockIcon from "../images/clock.svg";
import emptyFolderIcon from "../images/empty-folder.svg";
import loaderIcon from "../images/loader-primary.svg";
import errorIcon from "../images/cloud-error.svg";

import "../styles/Feed.css";
import { FeedStatus } from "./FeedStatus";

export default function Feed({ isLoading, posts, title, subtitle, hasError }) {
  if (isLoading) {
    return <img src={loaderIcon} alt="loading" className="spin" />;
  }

  if (hasError) {
    return (
      <FeedStatus
        image={errorIcon}
        title="Algo deu errado"
        subtitle="Não foi possível carregar seu feed. Tente novamente mais tarde!"
      />
    );
  }

  if (posts.length === 0) {
    return (
      <FeedStatus
        image={emptyFolderIcon}
        title="Não encontramos nada"
        subtitle="Parece que você e seus amigos não postaram nada. Comece a escrever uma
    nova história!"
      />
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </header>

      <section className="feed">
        {posts.map((post) => (
          <article key={post.id}>
            <p>{post.content}</p>

            <footer>
              <div className="user-details">
                <img src={userIcon} alt="User" />
                <strong>{post.userName}</strong>
              </div>

              <div className="time">
                <img src={clockIcon} alt="Clock" />
                <span>
                  Publicado em {post.publishedAt.toLocaleDateString("pt-br")}
                </span>
              </div>
            </footer>
          </article>
        ))}
      </section>
    </>
  );
}
