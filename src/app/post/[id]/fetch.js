import showdown from "showdown";

export default async function fetchData(params) {
    return new Promise(async (resolve, reject) => {
        let gistId = params.id;
        let postContent = "";
        let data = {};

        if (gistId) {
            const gistApiEndpoint = `https://api.github.com/gists/${gistId}`;

            try {
                const response = await fetch(gistApiEndpoint);
                const gistData = await response.json();

                const markdownContent = gistData.files[Object.keys(gistData.files)[0]].content;

                const converter = new showdown.Converter();
                postContent = converter.makeHtml(markdownContent);

                data = {
                    ...gistData,
                    id: gistId,
                    postContent: postContent
                };

                resolve(data);
            } catch (error) {
                console.error('Error fetching Gist:', error);
                reject('Error fetching Gist');
            }
        } else {
            reject('No Gist ID provided in the URL');
        }
    });
}
