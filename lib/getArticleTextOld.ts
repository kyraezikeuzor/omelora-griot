import { Article } from '@/types';
import axios from 'axios';
import {load} from 'cheerio'
import { parse } from 'node-html-parser';
import { htmlToText } from 'html-to-text';
import cheerio from 'cheerio'

const getArticleText = async (articles: Article[]) => {
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
                {title: article.title, text:text, link:article.link}
            );
        }

        return texts;
    } catch (error) {
        console.error('Error fetching article text:', error);
        throw error;
    }
}

export default getArticleText;
