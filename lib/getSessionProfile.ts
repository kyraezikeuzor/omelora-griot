import { createClient } from "@/lib/supabase/server";
import userInfo from "@/lib/getSessionUser";



export const getProfileData = async () => {
  const supabase = createClient();
  const user = await userInfo();
  const { data, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.log(error);
  }

  if (data != null) {
    return data[0];
  }
};
