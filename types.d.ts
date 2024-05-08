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

type Post = {
    id:string;
    title:string;
    postedDate:string;
    tags:string[];
    content:string;
    createdBy:string;
}