import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function POST(req, res) {
  const body = await req.json();
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = { email: body.userEmail, password: body.userPassword };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return Response.json({
      valid: false,
      error: "Invalid Login Credentials",
    });
  }

  return Response.json({ valid: true, error: null });
}
