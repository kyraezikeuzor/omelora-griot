import { createClient } from "@/lib/supabase/server";

export const getPost = async (postId:string) => {
  const supabase = createClient();

  const {data, error} = await supabase
  .from("Posts")
  .select("*")
  .eq("id", postId)

  if (error) {
    throw error.message;
  }

  const post = data?.map((page:any) => ({
    id:page.id,
    fileId:page.file_id,
    title:page.title,
    postDate:page.post_date,
    tags:page.tags,
    content:page.content,
    caption:page.caption,
    canvaLink:page.canva_link,
    designer:page.designer,
    author:page.author,
    sourceLinks:page.source_links,
    postType: page.post_type,
    designed:page.designed_check,
    written:page.written_check,
    posted:page.posted_check
  }))

  return post[0];

}


export default getPost