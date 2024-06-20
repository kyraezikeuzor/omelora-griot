'use client'
import React, {useState} from 'react'
import updateTableRow from '@/lib/updateTableRow'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
/*
mode = 'text' | 'select'
tdContent
children
 */

type EditTableDataProps = {
    mode: 'text' | 'select',
    dataValue: any,
    dataOptions?: any,
    dataId:string,
    dataTable:string,
    dataColumn:string,
    children:React.ReactNode
}

export default function EditTableData({dataId,dataTable,dataColumn,dataValue,mode,dataOptions,children}:EditTableDataProps) {

    const [tdInputValue, setTdInputValue] = useState(dataValue)
    const [edit, setEdit] = useState<boolean>(false)

    console.log(edit)

    const handleEditDataValue = () => {
        setEdit(!edit)
        updateTableRow(dataTable,{'id':dataId},{[dataColumn]:tdInputValue})
    }

    const handleSetEdit = () => {
        setEdit(!edit)
    }

    return (
        <div>
            {mode === 'text' ?
                <div className='flex flex-row justify-between items-center gap-5'>
                    {edit == false ?
                    <>
                        {children}
                        <Button variant='action' onClick={handleSetEdit}>
                            Edit 
                        </Button> 
                    </> :
                    <>
                        <input 
                        placeholder={dataValue}
                        onChange={(e)=>setTdInputValue(e.target.value)}
                        className='w-full h-[30px] p-1'
                        />
                        <div className='flex flex-col items-end gap-1'>
                            <Button variant='action' onClick={handleEditDataValue}>
                                Add 
                            </Button> 
                            <Button variant='action' onClick={handleSetEdit}>
                                Cancel 
                            </Button> 
                        </div>
                    </>
                    }
                        
                </div> :
                <select value={dataValue}>
                    {dataOptions.map((item:any,index:number)=>(
                        <option key={index}>{item}</option>
                    ))}
                </select>
            } 
        </div>
    )
}