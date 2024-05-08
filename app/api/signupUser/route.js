import { createClient } from "@/lib/supabase/server";

import {getUser} from "@/lib/getUser";

export async function POST(req) {
  const body = await req.json();
  const supabase = createClient();

  // check if username exists
  const existingUsernames = await supabase
    .from("Profiles")
    .select("*", { count: "exact" })
    .ilike("username", `%${body.userName}%`);
  if (existingUsernames.count > 0) {
    return Response.json({
      valid: false,
      error: "Username already exists",
    });
  }
  console.log(existingUsernames);
  const data = { email: body.userEmail, password: body.userPassword };
  if (data.password.length < 6) {
    return Response.json({
      valid: false,
      error: "Password Must Be Atleast 6 Characters",
    });
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return Response.json({ valid: false, error: error.message });
  }
  const user = await userInfo();
  if (!user) {
    return Response.json({
      valid: false,
      error: "User information not available",
    });
  }
  console.log(user.id);
  console.log(body.userName);
  const profileData = await supabase
    .from("Profiles")
    .insert({ user_id: user.id, username: body.userName, role: "user" });

  if (profileData.error) {
    return Response.json({ valid: false, error: profileData.error.message });
  }
  return Response.json({ valid: true, error: null });
}
