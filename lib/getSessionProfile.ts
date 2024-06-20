import { createClient } from "@/lib/supabase/server";
import getSessionUser from '@/lib/getSessionUser'

export const getSessionProfile = async (profileId:string) => {
  const supabase = createClient();

  const user = await getSessionUser();

  const {data, error} = await supabase
  .from("Profiles")
  .select("*")
  .eq("user_id", user?.id)

  if (error) {
    return error.message;
  }

  return data[0];
}


export default getSessionProfile
