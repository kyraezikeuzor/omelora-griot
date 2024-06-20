import Link from 'next/link'
import { PostType } from '@/types';
import Icon from '@/components/Icon';
import Checkbox from '@/components/events/Checkbox';
import ClippedLink from '@/components/ClippedLink';
import CopyText from '@/components/events/CopyText';
import ReadMore from '@/components/ReadMore';
import TableDataEditor from '@/components/events/TableDataEditor';

import updateTableRow from '@/lib/updateTableRow';

export default function PostDatabase({ posts }: { posts: PostType[] }) {

    const thStyles = 'w-fit text-left text-sm opacity-75 font-medium p-3 border-b border-[--clr-grey-light]';
    const tdStyles = 'text-left text-sm p-3 border-b border-[--clr-grey-light]';
 
    const handleUpdatePostDesigned = () => {

    }

    const handleUpdatePostWritten = () => {
        
    }

    const handleUpdatePostPosted = () => {
        
    }

    return (
        <section className='w-full flex flex-col'>
            <div className='overflow-x-auto'>
                <table className='min-w-full border-separate border-spacing-0 rounded-xl'>
                    <thead>
                        <tr className='py-2 px-4 shadow-sm hover:bg-[--clr-base-accent]'>
                            <th className={thStyles}><Icon icon='Calendar' size='xs' /></th>
                            <th className={thStyles}>Title</th>
                            <th className={thStyles}><Icon icon='PencilEdit' size='xs' /></th>
                            <th className={thStyles}><Icon icon='Image' size='xs' /></th>
                            <th className={thStyles}>Post Date</th>
                            <th className={thStyles}>Canva Link</th>
                            <th className={thStyles}>File ID</th>
                            <th className={thStyles}>Type</th>
                            <th className={thStyles}>Designer</th>
                            <th className={thStyles}>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item, index) => (
                            <tr key={index} className={`py-2 px-4 hover:bg-[--clr-base-accent]`}>
                                <td className={`${tdStyles} `}>
                                    <Checkbox 
                                    checked={item.posted}
                                    onCheckOn={() => updateTableRow('Posts', { 'id': item.id }, { posted_check: true })}
                                    onCheckOff={() => updateTableRow('Posts', { 'id': item.id }, { posted_check: false })}
                                    />
                                </td>
                                <td className={`${tdStyles} lg:w-56 font-medium`}>
                                    <Link 
                                    target='_blank'
                                    className='hover:underline hover:underline-offset-2 hover:opacity-75' 
                                    href={`/posts/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </td>
                                <td className={`${tdStyles} `}>
                                    <Checkbox 
                                    checked={item.written}
                                    onCheckOn={() => updateTableRow('Posts', { 'id': item.id }, { written_check: true })}
                                    onCheckOff={() => updateTableRow('Posts', { 'id': item.id }, { written_check: false })}
                                    />
                                </td>
                                <td className={`${tdStyles} `}>
                                    <Checkbox
                                    checked={item.designed}
                                    onCheckOn={() => updateTableRow('Posts', { 'id': item.id }, { designed_check: true })}
                                    onCheckOff={() => updateTableRow('Posts', { 'id': item.id }, { designed_check: false })}
                                    />
                                </td>
                                <td className={`${tdStyles} `}>
                                    <TableDataEditor
                                    mode='text'
                                    dataValue={item.postDate}
                                    dataTable='Posts'
                                    dataColumn='post_date'
                                    dataId={item.id}
                                    >
                                        <span>{item.postDate}</span>
                                    </TableDataEditor>
                                </td>
                                <td className={`${tdStyles} text-xs`}>
                                    <TableDataEditor
                                    mode='text'
                                    dataValue={item.canvaLink}
                                    dataTable='Posts'
                                    dataColumn='canva_link'
                                    dataId={item.id}
                                    >
                                        <ClippedLink text={item.canvaLink} charCount={10} />
                                    </TableDataEditor>
                                </td>
                                <td className={`${tdStyles} `}>
                                    <CopyText text={item.fileId}>
                                        <ReadMore
                                        className='text-xs bg-[--clr-grey-extralight] hover:opacity-75 rounded-xl px-2'
                                        text={item.fileId}
                                        charCount={20}
                                        noButton
                                        />
                                    </CopyText>
                                </td>
                                <td className={`${tdStyles} text-xs`}>
                                    {item.postType}
                                </td>
                                <td className={`${tdStyles} text-xs`}>
                                    <TableDataEditor
                                    mode='text'
                                    dataValue={item.designer}
                                    dataTable='Posts'
                                    dataColumn='designer'
                                    dataId={item.id}
                                    >
                                        <span>{item.designer}</span>
                                    </TableDataEditor>
                                </td>
                                <td className={`${tdStyles} text-xs`}>
                                    <TableDataEditor
                                    mode='text'
                                    dataValue={item.author}
                                    dataTable='Posts'
                                    dataColumn='author'
                                    dataId={item.id}
                                    >
                                        <span>{item.author}</span>
                                    </TableDataEditor>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
