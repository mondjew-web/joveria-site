// JOVERIA — Bulle privée — Configuration Supabase
// Remplace les deux valeurs ci-dessous par celles de ton projet Supabase.
// Dashboard Supabase > Project Settings > API

const SUPABASE_URL = "https://ynbxaabqhwhxaftarhji.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7P9LIqqRQkcv9wM0yrkxVA_PfHQPwdY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Clé publique VAPID — sert à activer les notifications, sans risque à exposer
const VAPID_PUBLIC_KEY = "BDyH7jvjLFXkiBmFM-8mFYwY1p78pWeqD-ytDu6wZ-bShkEz7jL_GI0FIjfvUnUqqObRskRHzBiBwfTABqHsZvU";
