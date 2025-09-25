'use client'
import { CustomModal } from '@/components/custom-modal'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Question from './_components/question'
import { fetcher } from '@/lib/fetcher'
import { categoryApi } from '@/lib/api'

function Onboarding_control() {

    const [tags, setTags] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const data = await fetcher(categoryApi.createTag, { method: 'GET' })
            setTags(data as any)
        })()
    })

    return (
        <div className='p-6' >
            <div className='flex justify-end'>
                <CustomModal
                    trigger={
                        <Button className="font-rubik-400 bg-[#2B7272] py-3 text-white hover:bg-[#2B7272]">Add Questions</Button>
                    }
                    children={<Question tagsList={tags} />}
                />
            </div >

        </div >
    )
}

export default Onboarding_control