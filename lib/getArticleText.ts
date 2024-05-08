import { Article } from '@/types';
import { parse } from 'node-html-parser';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import cheerio from 'cheerio'
import {load} from 'cheerio'

const getTextContents = async (articles: Article[]) => {
    try {
        const texts = [];

        // Iterate over each article object
        for (const article of articles) {
            // Fetch HTML content of the article
            const response = await axios.get(`http://localhost:3001/proxy?url=${encodeURIComponent(article.link)}`);
            const htmlContent = response.data;

            // Load HTML content into cheerio
            const $ = load(htmlContent);

            // Select all <p> elements and extract their text content
            const paragraphs = $('p').map((index, element) => $(element).text()).get();

            // Combine all paragraph texts into a single string
            const text = paragraphs.join('\n');

            // Store the text content along with any other relevant data from the article object
            texts.push(
                `${article.title + text}`
            );
        }

        return texts;
    } catch (error) {
        console.error('Error fetching article text:', error);
        throw error;
    }
    
    
    /*const textContents: string[] = [];

    for (const article of articles) {
        try {
            const response = await axios.get(`http://localhost:3001/proxy?url=${encodeURIComponent(article.link)}`);
            const html = response.data;
            const root = parse(html);
            const text = htmlToText(root.innerHTML, {
                baseElements: { selectors: [ 'body' ] },
                selectors: [ { selector: 'a', options: { ignoreHref: true }}, 
                { selector: 'img', format: 'skip' }, { selector: 'p'} ],
                tables: true
            });
            textContents.push(text);
        } catch (error) {
            console.error(`Error fetching article text for ${article.title}:`, error);
            textContents.push('');
        }
    }

    console.log(textContents)
    return textContents;*/
}

export default getTextContents;
