// File: next-pwa.d.ts

declare module "next-pwa" {
  import { NextConfig } from "next";

  type PWAOptions = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: string[];
    fallbacks?: { [key: string]: string };
    // add more if needed
  };

  function withPWA(
    pwaOptions: PWAOptions
  ): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
