import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";


type Article = {
    position:number,
    link:string,
    title:string,
    source:string,
    date:string,
    snippet:string,
    thumbnail:string
}

type ArticleContent = {
    title:string,
    text:string,
    link:string,
}

type Post = {
    id:string;
    title:string;
    status:string;
    postDate:string;
    tags:string[];
    content:string;
    caption:string;
    designLink:string;
    createdBy:string;
}