/*import {Article} from '@/types'
import { parse } from 'node-html-parser';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import cheerio from 'cheerio'
import {load} from 'cheerio'

export async function POST(req:any, res:any) {
    try {
        const body = await req.json()
        const articles: Article[] = await body.articles

        const texts = [];

        // Iterate over each article object
        for (const article of articles) {
            // Fetch HTML content of the article
            const response = await axios.get(`${encodeURIComponent(article.link)}`);
            const htmlContent = response.data;

            // Load HTML content into cheerio
            const $ = load(htmlContent);

            // Select all <p> elements and extract their text content
            const paragraphs = $('p').map((index, element) => $(element).text()).get();

            // Combine all paragraph texts into a single string
            const text = paragraphs.join('\n');

            // Store the text content along with any other relevant data from the article object
            texts.push(
                {title: article.title, text:text}
            );
        }

        return texts;

    } catch (error) {
        console.error('Error fetching article text:', error);
        throw error;
    }

}*/