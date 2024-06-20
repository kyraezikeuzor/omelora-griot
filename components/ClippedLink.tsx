'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Icon from './Icon'

type ReadMoreProps = {
    text: string;
    charCount: number;
}

const ClippedLink = ({text, charCount}:ReadMoreProps) => {

    let newText = ""

    if (text.length > charCount) {
        for (let i = 0; i < charCount; i++) {
            let punctuation = ' ';
    
            if (text[i] !== ' ') {
                punctuation = ''
            } 
    
            newText = newText.concat(text[i], punctuation)
        }
    } else if (text.length <= charCount) {
        newText = text;
    }

    return (
        <span className='relative bg-[--clr-grey-extralight] hover:opacity-75 px-3 rounded-lg'>
            <Link target='_blank' href={text}>{newText} <Icon fillColor='var(--clr-grey-dark)' className='absolute -right-2' icon='Link1' inline size='xs'/></Link>
        </span>
    )
}

export default ClippedLink;