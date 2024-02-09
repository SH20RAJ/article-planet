// pages/index.js
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link component from next/link
import showdown from 'showdown'; // Import showdown library for converting Markdown to HTML

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const gistApiEndpoint = "https://api.github.com/users/sh20raj/gists";
      const tagToFilter = "ArticlePlanet";

      try {
        const response = await fetch(gistApiEndpoint);
        const gistsData = await response.json();

        const articleGists = gistsData;
        const shuffledArticles = articleGists.sort(() => Math.random() - 0.5);
        const selectedArticles = shuffledArticles.slice(0, 3);

        const fetchedArticles = await Promise.all(
          selectedArticles.map(async (gist) => {
            const title = gist.description || "Untitled";
            const gistId = gist.id;
            const gistUrl = gist.html_url;

            const markdownContentResponse = await fetch(gist.files[Object.keys(gist.files)[0]].raw_url);
            const markdownContent = await markdownContentResponse.text();

            function extractMetadata(markdown) {
              const match = markdown.match(/^---([\s\S]*?)---([\s\S]*)/);
              const metadata = {};

              if (match && match[1]) {
                const metadataText = match[1].trim();

                metadataText.split("\n").forEach((line) => {
                  const [key, ...valueParts] = line.split(":").map((item) => item.trim());
                  metadata[key] = valueParts.join(":").replace(/(^"|"$)/g, "").trim();
                });

                metadata.tags = metadata.tags ? metadata.tags.split(",").map((tag) => tag.trim()) : [];
              }

              return metadata;
            }

            const meta = extractMetadata(markdownContent);

            if (!meta.ArticlePlanet) {
              return '';
            }

            function convertToRelativeDate(dateString) {
              const currentDate = new Date();
              const providedDate = new Date(dateString);
              const timeDifferenceInSeconds = Math.floor((currentDate - providedDate) / 1000);

              if (timeDifferenceInSeconds < 60) {
                return 'just now';
              } else if (timeDifferenceInSeconds < 3600) {
                const minutes = Math.floor(timeDifferenceInSeconds / 60);
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
              } else if (timeDifferenceInSeconds < 86400) {
                const hours = Math.floor(timeDifferenceInSeconds / 3600);
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
              } else if (timeDifferenceInSeconds < 2592000) {
                const days = Math.floor(timeDifferenceInSeconds / 86400);
                return `${days} day${days > 1 ? 's' : ''} ago`;
              } else {
                return 'more than a month ago';
              }
            }

            let date = convertToRelativeDate(meta.datePublished);
            let coverUrl = meta.cover;

            // Convert Markdown to HTML
            const converter = new showdown.Converter();
            const htmlContent = converter.makeHtml(markdownContent);

            return (
              <div className="col-md-4" key={gistId}>
                <div className="card">
                  <Link href={`../post/${gistId}`}>
                    <a>
                      <img style={{ height: '200px', width: '100%' }} className="img-fluid img-thumb" src={coverUrl || `https://random.imagecdn.app/500/300?id=${gistId}`} alt="" />
                    </a>
                  </Link>
                  <div className="card-block">
                    <h2 className="card-title">
                      <Link href={`../post/${gistId}`}>
                        <a>{title}</a>
                      </Link>
                    </h2>
                    <div className="metafooter">
                      <div className="wrapfooter">
                        <span className="meta-footer-thumb">
                          <Link href={`user.html?id=${gist.owner.login}`}>
                            <a><img className="author-thumb" src={gist.owner.avatar_url} alt={gist.owner.login} /></a>
                          </Link>
                        </span>
                        <span className="author-meta">
                          <span className="post-name">
                            <Link href={`../user.html?id=${gist.owner.login}`}>
                              <a>{gist.owner.login}</a>
                            </Link>
                          </span><br />
                          <span className="post-date">{date}</span><span className="dot"></span><span className="post-read">6 min read</span>
                        </span>
                        <span className="post-read-more">
                          <Link href={`../post/${gistId}`} title="Read Story">
                            <a>
                              <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                <path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path>
                              </svg>
                            </a>
                          </Link>
                        </span>
                      </div>
                    </div>
                    {/* Display Markdown content as HTML */}
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                  </div>
                </div>
              </div>
            );
          })
        );

        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching Gists:", error);
        // Handle error
      }
    };

    fetchArticles();
  }, []);

  return (
    <div id="postcontainer" className="row">
      {articles}
    </div>
  );
}
