import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{const url=siteUrl();if(!url||process.env.SITE_INDEXABLE!=='true')return [];return ['','/contact','/confidentialite','/mentions-legales'].map(path=>({url:url+path,changeFrequency:'monthly',priority:path===''?1:.5}));}
