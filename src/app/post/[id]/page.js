// pages/[id].js
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import showdown from 'showdown';

export default function YourPageName({ gistData }) {
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    if (gistData) {
      const markdownContent = gistData.files[Object.keys(gistData.files)[0]].content;
      const converter = new showdown.Converter();
      const htmlContent = converter.makeHtml(markdownContent);
      setPostContent(htmlContent);
    }
  }, [gistData]);

  return (
    <div>
      <h1>My Post: {gistData && gistData.description}</h1>
      {gistData && (
        <div>
          <p>Title: {gistData.description}</p>
          <p>Published Date: {gistData.updated_at}</p>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
      <Link href="/post"><a>Go Back</a></Link>
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch a list of Gist IDs from your API or database
  // Here, you need to provide an array of paths, each containing the params object
  // For example:
  const paths = [
    { params: { id: 'gist_id_1' } },
    { params: { id: 'gist_id_2' } },
    // Add more paths as needed
  ];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`https://api.github.com/gists/${params.id}`);
    const gistData = await response.json();
    return { props: { gistData } };
  } catch (error) {
    console.error('Error fetching Gist data:', error);
    return { props: { gistData: null } };
  }
}
