import type { Metadata } from 'next';
export const siteName = 'StratonLab';
export const description = 'StratonLab conçoit des solutions d’intelligence artificielle sur mesure pour les entreprises : automatisez vos processus et simplifiez le travail de vos équipes.';
export function siteUrl(): string | undefined {
  try { const url = new URL(process.env.SITE_URL || ''); return url.protocol === 'https:' && !url.username && !url.password ? url.origin : undefined; } catch { return undefined; }
}
export function contactEmail(): string | undefined {
  const value = process.env.CONTACT_EMAIL?.trim();
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? value : undefined;
}
export function pageMetadata(title: string, path: string, summary = description): Metadata {
  const origin = siteUrl();
  return {title,description:summary,alternates:origin ? {canonical:origin+path} : undefined,openGraph:{title,description:summary,locale:'fr_FR',siteName,type:'website',...(origin ? {url:origin+path,images:[{url:origin+'/opengraph-image',width:1200,height:630,alt:'StratonLab — L’intelligence artificielle à votre service'}]} : {})},twitter:{card:'summary_large_image',title,description:summary}};
}
