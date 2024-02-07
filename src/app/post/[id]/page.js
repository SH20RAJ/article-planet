// pages/your-page-name.js
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import showdown from 'showdown'; // Import showdown for Markdown to HTML conversion

export default function YourPageName({ params }) {
  const [gistData, setGistData] = useState(null);
  const [postContent, setPostContent] = useState('');
  const gistId = params.id; // Assuming you're receiving the ID from props

  useEffect(() => {
    const fetchGistData = async () => {
      try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        const data = await response.json();
        setGistData(data);
        
        // Extract Markdown content from Gist data
        const markdownContent = data.files[Object.keys(data.files)[0]].content;
        
        // Convert Markdown to HTML
        const converter = new showdown.Converter();
        const htmlContent = converter.makeHtml(markdownContent);
        setPostContent(htmlContent);
      } catch (error) {
        console.error('Error fetching Gist data:', error);
      }
    };

    if (gistId) {
      fetchGistData();
    }
  }, [gistId]);

  return (
    <div>
      <h1>My Post: {gistId}</h1>
      {gistData && (
        <div>
          <p>Title: {gistData.description}</p>
          <p>Published Date: {gistData.updated_at}</p>
          {/* Add other relevant data here */}
        </div>
      )}
      {/* Render post content as HTML */}
      <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
      <Link href="../post/">Go Back</Link>
    </div>
  );
}

// This is just a basic example to get you started. You can expand upon it as needed.
