import showdown from "showdown";
import "@/assets/css/mediumish.css"
import "@/assets/css/bootstrap.min.css"

export default async function PostContent({ params }) {
    let gistId = params.id;
    let postContent = "";

    if (gistId) {
        const gistApiEndpoint = `https://api.github.com/gists/${gistId}`;

        try {
            const response = await fetch(gistApiEndpoint);
            const gistData = await response.json();

            const markdownContent = gistData.files[Object.keys(gistData.files)[0]].content;

            const converter = new showdown.Converter();
            postContent = converter.makeHtml(markdownContent);
        } catch (error) {
            console.error('Error fetching Gist:', error);
            postContent = '<p>Error loading Gist content.</p>';
        }
    } else {
        postContent = '<p>No Gist ID provided in the URL.</p>';
    }

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
        </>
    )
}
