// getArticleText.js

import { ArticleType } from '@/types';
import axios from 'axios';
import { load } from 'cheerio';

const getArticleText = async (articles: ArticleType[]) => {
    try {
        const texts = [];
        const apiBaseUrl = process.env.NEXT_PUBLIC_PROXY_API_BASE_URL || 'http://localhost:3000';

        for (const article of articles) {
            const encodedUrl = encodeURIComponent(article.link);
            const response = await axios.get(`${apiBaseUrl}/api/proxy?url=${encodedUrl}`);
            const htmlContent = response.data;

            const $ = load(htmlContent);
            const paragraphs = $('p').map((index, element) => $(element).text()).get();
            const text = paragraphs.join('\n');

            texts.push({ title: article.title, text: text, link: article.link });
        }

        return texts;
    } catch (error:any) {
        console.error('Error fetching article text:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
        throw error;
    }
};

export default getArticleText;
