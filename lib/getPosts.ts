import { Client } from '@notionhq/client';



export default async function getPosts() {

  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_GRIOT_DB });

  const databaseId: string | undefined = process.env.NEXT_PUBLIC_NOTION_GRIOT_DB_ID || '';

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response?.results.map((page:any) => ({
    id: page.id,
    title: page.properties['Title']?.title[0].text?.content,
    status:page.properties['Status']?.status?.name,
    postDate: page.properties['Post-date']?.date?.start,
    tags: page.properties['Tags']?.multi_select.map((tag:any) => tag.name),
    content: page.properties['Content']?.rich_text.map((item:any)=> item.text?.content),
    caption: page.properties['Caption']?.rich_text.map((item:any)=> item.text?.content),
    designLink: page.properties['Design-link']?.text?.content,
    createdBy: page.properties['Created-by']?.text?.content,
  }));
}
