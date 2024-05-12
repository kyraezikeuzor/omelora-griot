'use client'
import React, {useState, useEffect} from 'react'

import { createClient } from "@/lib/supabase/client";

import {Article, ArticleContent} from '@/types';

import Icon from '@/components/Icon'
import ArticleComponent from '@/components/Article'
import Select from '@/components/Select'
import SelectRemove from '@/components/SelectRemove'
import CircleLoader from '@/components/CircleLoader'

import getArticleText from '@/lib/getArticleTextOld'
import getAIResponse from '@/lib/getAIResponse'
import {postData} from '@/lib/requests/requests'
import {handleAddItem, handleRemoveItem, getIndex} from '@/utils/helpers'
import {infographicPrompt, spotlightPrompt} from '@/utils/prompts'


export default function Generate() {

    // Variables
    const [search, setSearch] = useState<string>('')
    const [postType, setPostType] = useState<string>('1')
    const [articles, setArticles] = useState<Article[]>([])

    const [articlesContent, setArticlesContent] = useState<ArticleContent[]>([])
    const [selectedArticles, setSelectedArticles] = useState<Article[]>([])
    const [prompt, setPrompt] = useState<string>('')
    const [AIResponse, setAIResponse] = useState<string | null>(null)
    
    // Loading
    const [articlesLoading, setArticlesLoading] = useState(false)
    const [AIResponseLoading, setAIResponseLoading] = useState(false)

    // Page mount state
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    useEffect(() => {
        const handleBeforeUnload = (event:any) => {
          // Check if the event's type is "beforeunload"
          if (event.type === 'beforeunload' || document.hidden == true) {
            // Page is refreshing
            console.log('Page is refreshing');
            setIsRefreshing(true);
          } else if (event.type !== 'beforeunload' || document.hidden == false) {
            setIsRefreshing(false)
          }
        };
    
        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // Cleanup: remove event listener
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      });
    

    useEffect(()=>{
        const getUserProgress = async () => {
            const supabase = createClient()
            const user = await getSessionUser()

            const {data, error} = await supabase
            .from("User Progress")
            .select("*")
            .eq("user_id", user?.id)

            const newUserProgress = {
                user_id: user?.id,
                searched_articles: articles,
                selected_searched_articles:selectedArticles,
                searched_query: search,
                generated_text: AIResponse,
                selected_post_type: postType
            }

            if (data) {
                if (data.length != 0) {
                    if (articles?.length == 0) {
                        setArticles(data[0].searched_articles)
                    }

                    setSelectedArticles(data[0].selected_searched_articles)
                    
                    if (search === '') {
                        setSearch(data[0].searched_query)
                    }

                    if (AIResponse === '') {
                        setAIResponse(data[0].generated_text)
                    }

                } else if (data.length == 0) {
                    const { data, error } = await supabase
                    .from("User Progress")
                    .upsert([newUserProgress])
                }
            }
        }
        getUserProgress()
    },[]); // Update once component mounts

    useEffect(() => {
        const updateUserData = async () => {
            const supabase = createClient()
            const user = await getSessionUser()

            if (articles?.length > 0) {
                try {
                    const { data, error } = await supabase
                    .from('User Progress')
                    .update({ searched_articles: articles})
                    .eq('user_id', user?.id);
                } catch (error) {
                    console.error('Error updating user progress:', error);
                }
            }

            try {
                const { data, error } = await supabase
                .from('User Progress')
                .update({ selected_post_type: postType, searched_query:search})
                .eq('user_id', user?.id);

            } catch {
                console.error('Error updating user progress')
            }

            console.log(isRefreshing)

            if (isRefreshing == false) { // Ensures that when refreshing a page, selectedArticles will not be wiped and not push an empty array to the db
                try {
                    const { data,error } = await supabase
                    .from('User Progress')
                    .update({selected_searched_articles:selectedArticles})
                    .eq('user_id', user?.id)
                } catch {

                }
            }
        }

        updateUserData()

      }, [articles, postType, selectedArticles, isRefreshing]);

    useEffect(()=>{
        const handleFetchArticleText = async () => {
            try {
                const data: ArticleContent[] = await getArticleText(selectedArticles)
                console.log(data)
                setArticlesContent(data)
            } catch (error) {
                console.log(error)
            }
        }

        handleFetchArticleText()
    },[selectedArticles])

    useEffect(()=>{
        /*const handleCreatePrompt = () => {
            if (postType === '1') {
                setPrompt(infographicPrompt + articleContents)
            } else if (postType === '2') {
                setPrompt(spotlightPrompt + articleContents)
            }
        }
        handleCreatePrompt()*/
    }, [postType])


    const getSessionUser = async () => {
        const supabase = createClient()
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) {
          return null; // Return null if no user or error occurs
        }
        return user;
    }

    const handleArticleSearch = async () => {
        setArticlesLoading(true)
        const body = { query: search }
        const response = await postData(`api/search`, body);

        if (response) {
            setArticles(response.data.news_results);
            setArticlesLoading(false);
        } else if (!response) {
            console.error('Error fetching data from Next.js API:');
            setArticlesLoading(false);
        }
    };

    const handleAIResponse = async () => {
        setAIResponseLoading(true)
        const chat = await getAIResponse(prompt)
        if (chat != null) {
            setAIResponse(chat)
            setAIResponseLoading(false)
        }
    }

    const handleCheckArticleHasText = (article:Article) => {
        // Check if article is selected?
        if (articlesContent != null) {
            if (selectedArticles.includes(article)) {
                // Const index = the number where article parameter equals selected Articles
                const index = getIndex(article, articles, selectedArticles)
                
                if (articlesContent[index]) {
                    if (articlesContent[index].text.length < 10) {
                        return 'No Text Available'
                    } else if (articlesContent[index].text.length >= 10) {
                        return `Text Available`
                    }
                }  
            }
        }
        return
    }
    

    return (
        <section className='w-full flex flex-col md:flex-row gap-5 '>
            
            <section className='w-full md:w-1/3 h-screen flex flex-col gap-5 p-5 rounded-lg border border-[--clr-grey-light] shadow-sm'>
                <div className='flex flex-col gap-2 border border-[--clr-grey-light] p-5 rounded-md'>
                    <span className='font-semibold text-sm'>Search </span>
                    <div className='w-full flex flex-col md:flex-row gap-2 justify-between'>
                        <input type='text' 
                        onChange={(e)=>setSearch(e.target.value)} 
                        className='w-full'
                        placeholder={search}/>
                        <button className='bg-[--clr-green-base] p-2 rounded-lg' onClick={handleArticleSearch}>
                            <Icon icon="Search" className='fill-white'/>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col h-2/5 overflow-y-scroll gap-2 border border-[--clr-grey-light] p-5 rounded-md'>
                    <span className='font-semibold text-sm'>Select from Articles</span>
                    <div className='flex flex-col gap-5'>
                    {!articlesLoading ? articles?.map((item,index)=>(
                        <Select
                        key={index}
                        onSelectOn={()=>{handleAddItem(setSelectedArticles, selectedArticles, item)}}
                        onSelectOff={()=>{handleRemoveItem(setSelectedArticles, selectedArticles, item)}}
                        thisItem={item}
                        list={selectedArticles}
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
                    )) : <CircleLoader/> }
                    </div>
                </div>
                <div className='flex flex-col gap-2 border border-[--clr-grey-light] p-5 rounded-md'>
                    <span className='font-semibold text-sm'>Select Post Type</span>
                    <select
                        value={postType}
                        onChange={(e)=>setPostType(e.currentTarget.value)}
                    >
                        <option value='1'>Infographic</option>
                        <option value='2'>Spotlight</option>
                    </select>
                </div>
                <button className='bg-[--clr-green-base] p-2 rounded-lg text-white font-medium' onClick={()=>handleAIResponse()}>
                    Generate <Icon icon="Search" className='inline fill-white' size='sm'/>
                </button>
            </section>

            <section className='w-full md:w-2/3 min-h-full flex flex-col gap-5 p-5 rounded-lg border border-[--clr-grey-light] shadow-sm'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <span className='font-semibold text-sm'>Generate Post</span>
                    <button className='bg-[--clr-green-base] py-2 px-4 text-sm rounded-lg text-white font-medium' onClick={()=>handleAIResponse()}>
                        Add to Database <Icon icon="Check" className='inline fill-white' size='sm'/>
                    </button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <span className='font-semibold text-sm'>Selected Articles</span>
                    <div className='flex flex-col gap-1'>
                        {selectedArticles?.map((item,index)=>(
                            <SelectRemove key={index} onSelectOff={()=>handleRemoveItem(setSelectedArticles,selectedArticles,item)}>
                                <span className='text-sm'>{item.title} | {item.source} | <b className='font-semibold'>{handleCheckArticleHasText(item)}</b></span>
                            </SelectRemove>
                        ))}
                    </div>
                </div>
                <div className=''>
                    {!AIResponseLoading ? AIResponse : <CircleLoader/>}

                    
                    
                </div>
            </section>
        </section>
    )
}
//whitespace-pre
