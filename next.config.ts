import type { NextConfig } from "next";

const defaultSupabaseUrl = "https://pmtutukpkosfftlhnrrv.supabase.co";
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl;

let parsedHostname = "pmtutukpkosfftlhnrrv.supabase.co";

try {
  const parsed = new URL(supabaseUrl);
  if (parsed.hostname) {
    parsedHostname = parsed.hostname;
  }
} catch {
  parsedHostname = "pmtutukpkosfftlhnrrv.supabase.co";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: parsedHostname,
        port: "",
        pathname: "/storage/v1/object/public/portfolio-media/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
