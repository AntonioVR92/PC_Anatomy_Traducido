// SERVER-ONLY Supabase client. Importing this module from a client component
// throws a build error on purpose (the `server-only` package enforces it), so
// the service-role key can never leak into the browser bundle.
//
// Why service-role? The waitlist is a public, anonymous signup — there is no
// logged-in user. The service-role key lets the API route write rows without
// per-user auth, and it bypasses Row Level Security (RLS), which is fine here
// because the only writes come from this server route.
//
// Privacy: this repository is public (open source), so NO secrets are stored
// in code. Both values below come from environment variables at runtime:
//   - NEXT_PUBLIC_SUPABASE_URL      — the project URL (public by design)
//   - SUPABASE_SERVICE_ROLE_KEY     — secret, server-side only, never shipped
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

// If either env var is missing, export `null` instead of throwing. The API
// route then responds with a friendly "not configured" error instead of
// crashing — useful in local dev before the keys are added.
export const supabase =
  url && serviceRoleKey ? createClient(url, serviceRoleKey) : null;
