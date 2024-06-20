import { Client } from '@notionhq/client';
import { config } from "dotenv"

config()

export default async function getPost(postId:string) {

  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_GRIOT_DB_KEY });
  const databaseId: string | undefined = process.env.NEXT_PUBLIC_NOTION_GRIOT_DB_ID || '';
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const item = response?.results.filter(item => item.id === postId).map((page:any) => ({
    id: page.id,
    postId: page.properties['Post-id']?.formula.string,
    title: page.properties['Title']?.title[0].text?.content,
    status: {color:page.properties['Status']?.status?.color, text:page.properties['Status']?.status?.name},
    postDate: page.properties['Post-date']?.date?.start,
    tags: page.properties['Tags']?.multi_select.map((tag:any) => tag.name),
    content: page.properties['Content']?.rich_text.map((item:any)=> item.text?.content),
    caption: page.properties['Caption']?.rich_text.map((item:any)=> item.text?.content),
    designLink: page.properties['Design-link']?.url,
    createdBy: page.properties['Created-by']?.text?.content,
  }))


  return item;
}


// POST endpoint to create a new page in Notion
app.post('/api/post', async (req, res) => {
    const { postTitle, postCaption, postContent } = req.body;

    try {
        const response = await notion.request({
            path: 'pages',
            method: 'POST',
            body: {
                parent: {
                    type: 'database_id',
                    database_id: databaseId,
                },
                properties: {
                    Title: { title: [{ text: { content: postTitle } }] },
                    Caption: { rich_text: [{ text: { content: postCaption } }] },
                    Content: { rich_text: [{ text: { content: postContent } }] }
                },
                children: [
                    {
                        object: 'block',
                        paragraph: {
                            rich_text: [{ text: { content: postContent } }],
                            color: 'default'
                        }
                    }
                ]
            },
            headers: {
                Authorization: `Bearer ${process.env.NOTION_GRIOT_DB_KEY}`
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.error('Error creating page in Notion:', error);
        res.status(500).json({ error: error.message });
    }
});