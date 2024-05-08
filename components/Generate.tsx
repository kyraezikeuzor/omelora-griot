'use client'
import React, {useState, useEffect} from 'react'
import {Article} from '@/types';

import ArticleComponent from '@/components/Article'
import Select from './Select'

import getAIResponse from '@/lib/getAIResponse'
import getTextContents from '@/lib/getArticleText';

import {handleAddItem, handleRemoveItem} from '@/utils/utilities'
import {infographicPrompt,spotlightPrompt} from '@/utils/prompts'

export default function Generate() {

    const [search, setSearch] = useState('')
    const [postType, setPostType] = useState<string>('1')
    const [articles, setArticles] = useState<Article[]>([])
    const [articleContents, setArticleContents] = useState<string[]>([])
    const [selectedArticles, setSelectedArticles] = useState<Article[]>([])
    const [prompt, setPrompt] = useState<string>('')

    const handleArticleSearch = () => {
        const location = '585069efee19ad271e9c9b36'

        fetch(`http://localhost:3001/search?api_key=${process.env.NEXT_PUBLIC_SERPAPI_API_KEY}&engine=google&q=${search}&location=${location}&google_domain=google.com&gl=us&hl=en&tbm=nws`)
        .then(response => response.json())
        .then(data => {
            console.log(data.news_results);
            setArticles(data.news_results)
        })
        .catch(error => {
            console.error('Error fetching data from Express server:', error);
        });
    };

    useEffect(()=>{
        if (selectedArticles != null) {
            getTextContents(selectedArticles)
                .then((articleTextContents: string[]) => {
                    setArticleContents(articleTextContents);
                })
                .catch(error => {
                    // Handle error if necessary
                    console.error('Error fetching article text:', error);
                });
        }
    },[selectedArticles])

    useEffect(()=>{
        if (postType === '1') {
            setPrompt(infographicPrompt + articleContents)
        } else if (postType === '2') {
            setPrompt(spotlightPrompt + articleContents)
        }

        console.log(prompt)

    }, [postType, articleContents])

    

    return (
        <section className='w-full min-h-full flex flex-row gap-10 '>
            
            <section className='md:w-1/4 h-full flex flex-col gap-5 p-5 rounded-md border-2 border-[--clr-grey-light]'>
                <div className='flex flex-col gap-2'>
                    <span>Search</span>
                    <div className='w-full flex flex-col md:flex-row justify-between'>
                        <input type='text' onChange={(e)=>setSearch(e.target.value)} />
                        <button className='bg-green-500 rounded-lg' onClick={handleArticleSearch}>Search</button>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span>Select Post Type</span>
                    <select
                        value={postType}
                        onChange={(e)=>setPostType(e.currentTarget.value)}
                    >
                        <option value='1'>Infographic</option>
                        <option value='2'>Spotlight</option>
                    </select>
                </div>

                <div>
                    <span>Select from Articles</span>
                    <div className='flex flex-col gap-5'>
                    {articles?.map((item,index)=>(
                        <Select
                        key={index}
                        onSelectOn={()=>{handleAddItem(setSelectedArticles, selectedArticles, item)}}
                        onSelectOff={()=>{handleRemoveItem(setSelectedArticles, selectedArticles, item)}}
                        >
                            <ArticleComponent
                            position={item.position}
                            link={item.link}
                            title={item.title}
                            source={item.source}
                            date={item.date}
                            snippet={item.snippet}
                            thumbnail={item.thumbnail}
                            />
                        </Select>
                    ))}
                    </div>
                </div>
            </section>

            <section className='w-full md:w-3/4 min-h-full flex flex-col gap-5 p-5 rounded-md border-2 border-[--clr-grey-light]'>
                
                <span>Generate Article</span>
                <div className='flex flex-col gap-5'>
                    Text in Use:
                    <div>
                        {selectedArticles?.map((item,index)=>(
                            <div>
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>

                <span>Prompt</span>
                <div className='whitespace-pre'>
                    {prompt}
                </div>
                 
            
            </section>

        </section>
    )
}
