import type { Metadata,Viewport } from 'next';
import {connection} from 'next/server';
import localFont from 'next/font/local';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {Motion} from '@/components/motion';
import {description,siteUrl} from '@/lib/site';
import './globals.css';
const manrope=localFont({src:'../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',variable:'--font-manrope',display:'swap'});
export const metadata:Metadata={metadataBase:new URL(siteUrl() || 'http://127.0.0.1:3000'),title:{default:'StratonLab — L’intelligence artificielle à votre service',template:'%s | StratonLab'},description,robots:{index:!!siteUrl()&&process.env.SITE_INDEXABLE==='true',follow:!!siteUrl()&&process.env.SITE_INDEXABLE==='true'},icons:{icon:[{url:'/favicon.ico'},{url:'/favicon-32x32.png',sizes:'32x32',type:'image/png'},{url:'/favicon-16x16.png',sizes:'16x16',type:'image/png'}],apple:'/apple-touch-icon.png'},manifest:'/site.webmanifest'};
export const viewport:Viewport={themeColor:'#FDD33C'};
export default async function RootLayout({children}:{children:React.ReactNode}){await connection();return <html lang="fr" className={manrope.variable}><body><a className="skip-link" href="#contenu">Aller au contenu</a><Header/>{children}<Footer/><Motion/></body></html>}
