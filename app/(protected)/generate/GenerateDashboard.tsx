'use client'
import React, {useState, useEffect} from 'react'

import { createClient } from "@/lib/supabase/client";

import {ArticleType, ArticleContentDto, PostType, PostDto} from '@/types';

import Icon from '@/components/Icon'
import Button from '@/components/Button'
import ArticleCard from '@/components/ArticleCard'
import SelectItem from '@/components/events/SelectItem'
import SelectRemoveItem from '@/components/events/SelectRemoveItem'
import CircleLoader from '@/components/dialog/CircleLoader'

import getArticleText from '@/lib/getArticleText'
import getAIResponse from '@/lib/getAIResponse'
import createPost from '@/lib/createPost'
import createCanvaDesign from '@/lib/canva/createCanvaDesign'
import updateTableRow from '@/lib/updateTableRow'

import {postData} from '@/lib/requests/requests'
import {handleAddItem, handleGetIndex, handleToFileIdFromPostItle} from '@/assets/helpers'
import {infographicPrompt, spotlightPrompt} from '@/assets/prompts'
import {availablePostTags}  from '@/assets/tags'

export default function Generate() {

    // Variables
    const [search, setSearch] = useState<string>('')
    const [articles, setArticles] = useState<ArticleType[]>([])
    const [articlesContent, setArticlesContent] = useState<ArticleContentDto[]>([])
    const [selectedArticles, setSelectedArticles] = useState<ArticleType[]>([])
    const [contentKeyIdea,setContentKeyIdea] = useState<string>('')
    const [AIResponse, setAIResponse] = useState<string | null>(null)
    const [prompt, setPrompt] = useState<string>('')
    
    
    // Loading variables
    const [articlesLoading, setArticlesLoading] = useState(false)
    const [AIResponseLoading, setAIResponseLoading] = useState(false)

    // Page mount state
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    // Post upload variables
    const [postTitle, setPostTitle] = useState<string>('')
    const [postCaption, setPostCaption] = useState<string>('')
    const [postContent, setPostContent] = useState<string>('')
    const [postSourceLinks, setPostSourceLinks] = useState<string[]>([])
    const [postType, setPostType] = useState<string>('1')
    const [postDate, setPostDate] = useState<string | null>(null)
    const [postTags, setPostTags] = useState<string[] | null>(null)
    const [postCanvaLink, setPostCanvaLink] = useState<string>('')
    const [postDesigner, setPostDesigner] = useState<string>('')
    const [postAuthor, setPostAuthor] = useState<string>('')

    
    useEffect(()=>{
        const handleGetUserProgress = async () => {
            const supabase = createClient()
            const user = await handleGetSessionUser()

            const {data, error} = await supabase
            .from("User Progress")
            .select("*")
            .eq("user_id", user?.id)

            //If the user already has a progress row
            if (data) {
                if (data.length != 0) { 
                    setSelectedArticles(data[0].selected_searched_articles)
                    setArticles(data[0].searched_articles)
                    setSearch(data[0].searched_query)
                    setAIResponse(data[0].generated_text)
                
                } else if (data.length == 0) { //If the user does not have a progress row
                    // Establish a new progress row for a new user
                    const newUserProgress = { 
                        user_id: user?.id,
                        searched_articles: articles,
                        selected_searched_articles: selectedArticles,
                        searched_query: search,
                        generated_text: AIResponse,
                        selected_post_type: postType
                    }
                    
                    const { data, error } = await supabase
                    .from("User Progress")
                    .upsert([newUserProgress])

                    if (data) {
                        console.log(data)
                    }
                    if (error) {
                        console.log(error)
                    }
                }
            }
            if (error) {
                console.log(error)
            }
        }
        handleGetUserProgress()
    },[]); // Update once component mounts

    useEffect(() => {
        const handleUpdateUserProgress = async () => {
            const user = await handleGetSessionUser()

            if (!isRefreshing) { // Ensures that when refreshing a page, selectedArticles will not be wiped and not push an empty array to the db
                if (articles?.length > 0) {
                    updateTableRow('User Progress',{'user_id':user?.id},{searched_articles: articles})
                }
                
                if (selectedArticles.length > 0) {
                    updateTableRow('User Progress',{'user_id':user?.id},{selected_searched_articles: selectedArticles, selected_post_type: postType, searched_query: search,generated_text: AIResponse})
                }

                if (search != '') {
                    updateTableRow('User Progress',{'user_id':user?.id},{searched_query: search})
                }
            }
        }
        handleUpdateUserProgress()
      }, [articles, postType, selectedArticles, AIResponse, isRefreshing]);


    useEffect(()=>{
        const handleGetArticleText = async () => {
            try {
                const data: ArticleContentDto[] = await getArticleText(selectedArticles)
                setArticlesContent(data)
                console.log(articlesContent)
            } catch (error) {
                console.log(error)
            }
        }
        handleGetArticleText()
    },[selectedArticles])

    useEffect(()=>{
        const handleCreatePrompt = () => {
            let articlesToText = ``
            for (let i = 0; i < articlesContent.length; i++) {
                articlesToText = articlesToText + articlesContent[i].title + `\n` + articlesContent[i].text + `\n`
            }
            if (postType === '1') {
                setPrompt(infographicPrompt + contentKeyIdea + `\n` + 'Articles(s)' + `\n` + articlesToText)
            } else if (postType === '2') {
                setPrompt(spotlightPrompt + contentKeyIdea + `\n` + 'Articles(s)' + `\n` + articlesToText)
            }
        }
        handleCreatePrompt()
    }, [postType, articlesContent])


    useEffect(()=>{
        let sourceLinks = []
        for (let i = 0; i < selectedArticles.length; i++) {
            sourceLinks.push(selectedArticles[i].link)
        }
        setPostSourceLinks(sourceLinks)
    },[selectedArticles, postContent])


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
        console.log(articlesContent)
    },[selectedArticles])

    const handleGetSessionUser = async () => {
        const supabase = createClient()
        const {data: { user }, error} = await supabase.auth.getUser();
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

    const handleCreatePost = async () => {
        const postTypeText: 'Infographic' | 'Spotlight' = postType === '1' ? 'Infographic' : 'Spotlight'
        const currentDate = String(new Date())
        
        const postToCreate: PostDto = {
            title:postTitle,
            fileId: handleToFileIdFromPostItle(postTitle,currentDate),
            postDate:postDate,
            tags:postTags,
            content:postContent,
            caption:postCaption,
            canvaLink:postCanvaLink,
            designer:postDesigner,
            author:postAuthor,
            sourceLinks:postSourceLinks,
            postType: postTypeText,
            designed:false,
            written:true,
            posted:false,
        }
        
        createPost(postToCreate)
    }

    const handleRestartPost = async () => {
        const user = await handleGetSessionUser()
        setAIResponse('')

        updateTableRow('User Progress',{'user_id':user?.id},{generated_text: ''})
    }
    
    const handleCheckArticleHasText = (article:ArticleType) => {
        // Check if article is selected?
        if (articlesContent != null) {
            if (selectedArticles.includes(article)) {
                // Const index = the number where article parameter equals selected Articles
                const index = handleGetIndex(article, articles, selectedArticles)
                if (articlesContent[index]) {
                    if (articlesContent[index].text.length > 0) {
                        return 'Text Available'
                    } else if (articlesContent[index].text.length == 0) {
                        return `Text Unavailable`
                    }
                }
            }
        } else if (articlesContent == null) {
            return 'Loading Availability'
        }
    }

    const handleRemoveItem = (item:any) => {
        console.log(`Removing item: ${item.title}`);
        setSelectedArticles(selectedArticles.filter(article => article != item))
    };

    const handlePostTagOptions = (e:any) => {
        const selectedOptions = Array.from(e.target.options)
        .filter((option:any) => option.selected)
        .map((option:any) => option.value)

        setPostTags(selectedOptions);
    }
    

    return (
        <section className='w-full flex flex-col md:flex-row gap-5'>
            
            {/*ARTICLE SEARCH CONTAINER*/}
            <section className='w-full lg:w-2/3 h-screen flex flex-col gap-5 '>
                <div className='w-full flex flex-col gap-3 p-5 rounded-lg border-base shadow-lg'>
                    <span className='font-semibold text-sm lg:text-base'>Search for Articles</span>
                    <div className='w-full flex flex-row gap-3 justify-between'>
                        <input type='text' 
                        onChange={(e)=>setSearch(e.target.value)} 
                        className='w-2/3 lg:w-5/6'
                        placeholder={search}/>
                        <Button variant='outline' onClick={handleArticleSearch}>
                            Search <Icon size='sm' fillColor='inherit' icon="Search"/>
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col h-fit overflow-y-hidden gap-3 p-5 rounded-lg border-base shadow-lg'>
                    <span className='font-semibold text-sm lg:text-base'>Select from Articles</span>
                    <div className='flex flex-col 2xl:grid 2xl:grid-cols-2 max-[2000px]-grid-cols-4 gap-3 overflow-y-scroll '>
                    {!articlesLoading ? articles?.map((item,index)=>(
                        <SelectItem
                        key={index}
                        onSelectOn={()=>{handleAddItem(setSelectedArticles, selectedArticles, item)}}
                        thisItem={item}
                        list={selectedArticles}
                        >
                            <ArticleCard
                            link={item.link}
                            title={item.title}
                            source={item.source}
                            date={item.date}
                            snippet={item.snippet}
                            thumbnail={item.thumbnail}
                            position={item.position}
                            />
                        </SelectItem>
                    )) : <CircleLoader/> }
                    </div>
                </div>
            </section>

            {/*GENERATE POST CONTAINER*/}
            <section className='w-full lg:w-1/3 h-screen overflow-y-scroll flex flex-col gap-5 shadow-lg'>
                
                {/*SELECT POSTS & POST TYPE CONTAINER*/}
                {!AIResponse && 
                <section className='w-full h-fit flex flex-col gap-3 p-5 rounded-lg border-base'>
                    <div className='w-full h-fit flex flex-col gap-3 border border-[--clr-grey-base] rounded-lg p-4'>
                        <span className='font-semibold text-sm lg:text-base'>Select Post Type</span>
                        <select
                            value={postType}
                            onChange={(e)=>setPostType(e.currentTarget.value)}
                        >
                            <option value='1'>Infographic</option>
                            <option value='2'>Spotlight</option>
                        </select>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-3 border border-[--clr-grey-base] rounded-lg p-4'>
                        <span className='font-semibold text-sm lg:text-base'>Select Post Type</span>
                        <textarea className='h-[200px]' onChange={(e:any)=>{setContentKeyIdea(e.target.value)}} placeholder='Enter key idea of post'/>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-3 border border-[--clr-grey-base] rounded-lg p-4'>
                        <span className='font-semibold text-base lg:text-base'>Selected Articles</span>
                        {selectedArticles.length != 0 ? 
                        <div className='flex flex-col gap-2'>
                            <div className=' flex flex-col gap-2'>
                                {selectedArticles?.map((item,index)=>(
                                <SelectRemoveItem 
                                key={index} 
                                item={item}
                                onSelectOff={handleRemoveItem}
                                >
                                    <div className='flex flex-col gap-2 bg-[--clr-grey-extralight] p-4 rounded-xl'>
                                        <span className='font-semibold text-sm'>{item.title} | by {item.source}</span>
                                        <p className='hidden ml-3 text-xs'>{item.snippet}</p>
                                        <span className='text-right font-semibold text-xs'>
                                            {handleCheckArticleHasText(item) === 'Text Available' && 
                                            <span><Icon inline icon="Check" size="sm"/> {handleCheckArticleHasText(item)}</span>}

                                            {handleCheckArticleHasText(item) === 'Text Unavailable' && 
                                            <span><Icon inline icon="XCircle" size="sm"/> {handleCheckArticleHasText(item)}</span>}

                                            {handleCheckArticleHasText(item) == null && 
                                            <div className='inline flex flex-row justify-end items-center gap-2'>
                                                <CircleLoader size='sm'/> <span>Loading Availability</span>
                                            </div>}
                                        </span>
                                    </div>
                                </SelectRemoveItem>
                                ))}
                            </div>
                            <br/>
                            <Button variant='outline' fullWidth onClick={()=>handleAIResponse()}>
                                <span>Generate <Icon icon="CirclePlus" inline fillColor='inherit' size='sm'/></span>
                            </Button>
                        </div> : 
                        <div className='flex flex-col items-center py-6 bg-[--clr-grey-light] opacity-30 rounded-xl'>
                            <span className='font-medium text-[--clr-grey-dark]'>No articles selected</span>
                        </div>
                        }
                    </div>
                </section>
                }

                {AIResponse && 
                <section className='w-full flex flex-col gap-3 p-5 rounded-lg border-base'>
                    <span className='font-semibold text-sm lg:text-base'>
                        AI-Generated {postType === '1' ? 'Infographic':'Spotlight'} Post
                    </span>
                    {AIResponseLoading ? <CircleLoader/> : 
                    <div>
                        {AIResponse ?
                        <div className='w-full flex flex-col gap-3'>
                            <div className='w-full flex flex-col gap-2 border border-[--clr-grey-base] rounded-lg p-4'>
                                <label className='font-semibold text-sm'>Post Title:</label>
                                <textarea 
                                onChange={(e:any)=>setPostTitle(e.target.value)} 
                                className='text-sm' 
                                placeholder='Enter post title'/>
                            </div>
                            <div className='w-full flex flex-col gap-2 border border-[--clr-grey-base] rounded-lg p-4'>
                                <label className='font-semibold text-sm'>Post Caption:</label>
                                <textarea 
                                onChange={(e:any)=>setPostCaption(e.target.value)} 
                                className='text-sm' 
                                placeholder='Enter post caption'/>
                            </div>
                            <div className='w-full flex flex-col gap-2 border border-[--clr-grey-base] rounded-lg p-4'>
                                <label className='font-semibold text-sm'>Post Author:</label>
                                <input 
                                onChange={(e:any)=>setPostAuthor(e.target.value)} 
                                className='text-sm' 
                                placeholder='Enter post caption'/>
                            </div>
                            <div className='w-full flex flex-col gap-2 border border-[--clr-grey-base] rounded-lg p-4'>
                                <label className='font-semibold text-sm'>Post Designer:</label>
                                <input 
                                onChange={(e:any)=>setPostDesigner(e.target.value)} 
                                className='text-sm' 
                                placeholder='Enter post caption'/>
                            </div>
                            <div className='w-full flex flex-col gap-2 whitespace-pre-wrap border border-[--clr-grey-base] rounded-lg p-4'>
                                <label className='font-semibold text-sm'>Post Tags:</label>
                                <select 
                                multiple={true} 
                                onChange={handlePostTagOptions} 
                                className='h-fit font-medium text-xs'>
                                    {availablePostTags.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-full flex flex-col gap-2 whitespace-pre-wrap border border-[--clr-grey-base] rounded-lg p-4'>
                                <label className='font-semibold text-sm'>Post Content:</label>
                                <textarea defaultValue={AIResponse ? AIResponse : ''}
                                onChange={(e:any)=>setPostContent(e.target.value)} 
                                className='h-[150px] font-medium text-xs'/>
                            </div> 
                            <Button disabled={!postTitle || !postCaption || !postContent || !postDesigner || !postAuthor || !postSourceLinks ? true : false} variant='outline' fullWidth onClick={handleCreatePost}>
                                <span>Upload Post <Icon icon="CirclePlus" inline fillColor='inherit' size='sm'/></span>
                            </Button>
                            <Button  variant='outline' onClick={handleRestartPost}>
                                <span>Restart post <Icon icon="Check" inline fillColor='inherit' size='sm'/></span>
                            </Button>
                        </div> 
                        : 
                        <div className='flex flex-col items-center py-6 bg-[--clr-grey-light] opacity-30 rounded-xl'>
                            <span className='font-medium text-[--clr-grey-dark]'>Nothing generated...</span>
                        </div>
                        }
                    </div>
                    }
                </section>
                }
            </section>
        </section>
    )
}
