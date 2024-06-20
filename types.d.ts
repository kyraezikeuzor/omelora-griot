import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";


type ArticleType = {
    position:number,
    link:string,
    title:string,
    source:string,
    date:string,
    snippet:string,
    thumbnail:string
}

type ArticleContentDto = {
    title:string,
    text:string,
    link:string,
}

type PostType = {
    id:string
    fileId:string;
    title:string;
    postDate:string | null;
    tags:string[] | null;
    content:string;
    caption:string;
    canvaLink:string;
    designer:string;
    author:string;
    sourceLinks:string[]
    postType: 'Infographic' | 'Spotlight'
    designed:boolean;
    written:boolean;
    posted:boolean;
}


type PostDto = {
    fileId:string;
    title:string;
    postDate:string | null;
    tags:string[] | null;
    content:string;
    caption:string;
    canvaLink:string;
    designer:string;
    author:string;
    sourceLinks:string[]
    postType: 'Infographic' | 'Spotlight'
    designed:boolean;
    written:boolean;
    posted:boolean;
}