import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site';
export default function robots():MetadataRoute.Robots{const url=siteUrl();const ready=!!url&&process.env.SITE_INDEXABLE==='true';return {rules:{userAgent:'*',...(ready?{allow:'/'}:{disallow:'/'})},...(ready?{sitemap:url+'/sitemap.xml'}:{})};}
