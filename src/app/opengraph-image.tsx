/* eslint-disable @next/next/no-img-element -- ImageResponse requiert une image HTML, pas next/image. */
import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
export const alt='StratonLab — L’intelligence artificielle à votre service';
export const size={width:1200,height:630};
export const contentType='image/png';
export default async function OpenGraphImage(){const logo=await readFile(path.join(process.cwd(),'public/brand/logo-StratonLab.png'));return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',background:'#f8f8f4',padding:80,color:'#171717',borderBottom:'22px solid #FDD33C'}}><div style={{display:'flex',marginBottom:55}}><img alt="StratonLab" src={'data:image/png;base64,'+logo.toString('base64')} width={280} height={70}/></div><div style={{fontSize:66,fontWeight:500,letterSpacing:-3,lineHeight:1.13,display:'flex',flexDirection:'column'}}><span>L’intelligence artificielle,</span><span>à votre service.</span></div><div style={{fontSize:23,marginTop:33,color:'#5c6350'}}>Des solutions IA pour les besoins réels de votre entreprise.</div></div>,size)}
