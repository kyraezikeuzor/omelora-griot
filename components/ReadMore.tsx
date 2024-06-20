'use client'
import React, {useState} from 'react'

type ReadMoreProps = {
    text: string;
    charCount: number;
    className?:string;
    noButton?: true
}

const ReadMore = ({text, charCount, className, noButton}:ReadMoreProps) => {

    const [readMore, setReadMore] = useState(false)

    const handleSetReadMore = () => {
        setReadMore(!readMore)
    }

    var newText = ""

    for (let i = 0; i < charCount; i++) {
        var punctuation = ' ';

        if (text[i] !== ' ') {
            punctuation = ''
        } 

        newText = newText.concat(text[i], punctuation)
    }

    return (
        <span className={className}>
            {noButton ? 
            <span>{newText}...</span>
            :
            <span>
                {!readMore && 
                <span>
                    {newText} <span onClick={handleSetReadMore} className='cursor-pointer text-[--clr-blue-base] font-medium'>Read more</span>
                </span>
                }

                {readMore &&
                <span>
                    {text} <span onClick={handleSetReadMore} className='cursor-pointer text-[--clr-blue-base] font-medium'>Read less</span>
                </span>
                }
            </span>
            }
        </span>
    )
}

export default ReadMore;