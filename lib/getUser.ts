import { createClient } from '@/lib/supabase/server';

export const getUser = async (profileId:string) => {
  const supabase = await createClient();

  const {data, error} = await supabase
  .from("Users")
  .select("*")
  .eq("user_id", profileId)

  if (error) {
    return error.message;
  }

  return data[0];
}

