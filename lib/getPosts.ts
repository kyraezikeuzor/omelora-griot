import {PostType} from '@/types'
import { createClient } from "@/lib/supabase/client";

export const getPosts = async () => {
  const supabase = createClient();

  const {data, error} = await supabase
  .from("Posts")
  .select("*")

  if (error) {
    console.log(error.message);
  }

  const posts:PostType[] = data?.map((page:any) => ({
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
  })) as PostType[];

  return posts;
}


export default getPosts