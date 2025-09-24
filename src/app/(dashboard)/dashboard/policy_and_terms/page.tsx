'use client'
import QuillEditor from '@/components/quillEditor'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function PolicyAndTerms() {
    const [privacyContent, setPrivacyContent] = useState('')
    const [termsContent, setTermsContent] = useState('')

    const handlePrivacySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Privacy Policy Submitted:', privacyContent)
        // TODO: submit to API or validation
    }

    const handleTermsSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Terms & Conditions Submitted:', termsContent)
        // TODO: submit to API or validation
    }

    return (
        <div className='p-6 flex flex-col gap-8'>

            <form
                onSubmit={handlePrivacySubmit}
                className='p-3 font-rubik-400 bg-white rounded-[20px]'
            >
                <h3 className="text-[20px] font-medium text-[#000000] mb-4">
                    Privacy Policy
                </h3>
                <QuillEditor
                    value={privacyContent}
                    onChange={setPrivacyContent}
                    className="font-rubik-400!"
                    placeholder='Please enter your privacy policy'
                />
                <div className='flex justify-end'>
                    <Button
                        type="submit"

                        className={` my-2 text-white px-8 py-2  bg-[#2b7272] hover:bg-[#1f5d57]`}
                    >
                        Save Privacy Policy
                    </Button>
                </div>

            </form>

            {/* ✅ Terms & Conditions Form */}
            <form
                onSubmit={handleTermsSubmit}
                className='p-3 font-rubik-400 bg-white rounded-[20px]'
            >
                <h3 className="text-[20px] font-medium text-[#000000] mb-4">
                    Terms and Conditions
                </h3>
                <QuillEditor
                    value={termsContent}
                    onChange={setTermsContent}
                    className="font-rubik-400!"
                    placeholder='Please enter your terms and conditions'
                />
                <div className='flex justify-end'>
                    <Button
                        type="submit"

                        className={` my-2 text-white px-8 py-2  bg-[#2b7272] hover:bg-[#1f5d57]`}
                    >
                        Save Terms and Conditions
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PolicyAndTerms
