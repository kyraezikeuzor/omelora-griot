import { createClient } from "@/lib/supabase/client";
import {PostType,PostDto} from '@/types'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const createPost = async (post:PostDto) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("Posts")
    .insert({
      title:post.title,
      file_id:post.fileId,
      post_date:post.postDate,
      tags:post.tags,
      content:post.content,
      caption:post.caption,
      canva_link:post.canvaLink,
      designer:post.designer,
      author:post.author,
      source_links:post.sourceLinks,
      post_type:post.postType,
      designed_check:post.designed,
      written_check:post.written,
      posted_check:post.posted
    });

  if (error) {
    return { message: "Failed to create post" };
  }
  return { message: "Successfully created post" };

};


export default createPost;