'use client'

import React, { useEffect, useState } from 'react'
import QuillEditor from '@/components/quillEditor'
import { Button } from '@/components/ui/button'
import { policyApi } from '@/lib/api'
import { fetcher } from '@/lib/fetcher'
import { toast } from 'sonner'
import { CheckCircle } from 'lucide-react'
import Loader from '@/components/loader'

function PolicyAndTerms() {
    const [privacyContent, setPrivacyContent] = useState('')
    const [termsContent, setTermsContent] = useState('')

    const [loading, setLoading] = useState(true)
    const [submittingPrivacy, setSubmittingPrivacy] = useState(false)
    const [submittingTerms, setSubmittingTerms] = useState(false)

    // Load existing data on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [privacyRes, termsRes] = await Promise.allSettled([
                    fetcher(policyApi.get('1'), { method: 'GET' }),
                    fetcher(policyApi.get('2'), { method: 'GET' })
                ]) as any

                if (privacyRes.status === 'fulfilled') {
                    setPrivacyContent(privacyRes?.value?.data?.content as any || '')
                } else {
                    console.error('Privacy Policy fetch failed:', privacyRes.reason)
                }

                if (termsRes.status === 'fulfilled') {
                    setTermsContent(termsRes?.value?.data?.content as any || '')
                } else {
                    console.error('Terms fetch failed:', termsRes.reason)
                }

            } catch (error) {
                // console.error('Unexpected fetch error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handlePrivacySubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittingPrivacy(true)
        try {
            const response = await fetcher(policyApi.create('1'), {
                method: 'POST',
                data: {
                    content: privacyContent
                },
            })
            if (response) {
                toast.success('Privacy Policy saved successfully!', {
                    description: 'Your changes have been saved.',
                    icon: <CheckCircle className="text-green-500 mr-4" />,
                    className: 'bg-green-50 text-green-900 border font-rubik-400 px-3 border-green-200',
                    duration: 4000,
                    closeButton: true
                });
            }

        } catch (error) {
        } finally {
            setSubmittingPrivacy(false)
        }
    }

    const handleTermsSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittingTerms(true)
        try {
            const response = await fetcher(policyApi.create('2'), {
                method: 'POST',
                data: {
                    content: termsContent,
                },
            })
            if (response) {
                toast.success('Terms and condition saved successfully!', {
                    description: 'Your changes have been saved.',
                    icon: <CheckCircle className="text-green-500 mr-4" />,
                    className: 'bg-green-50 text-green-900 border font-rubik-400 px-3 border-green-200',
                    duration: 4000,
                    closeButton: true
                });
            }
        } catch (error) {
        } finally {
            setSubmittingTerms(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-1 justify-center items-center min-h-screen">
                <Loader />
            </div>
        )
    }

    return (
        <div className='p-6 flex flex-col gap-8'>
            {/* ✅ Privacy Policy Form */}
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
                        className="my-2 text-white px-8 py-2 bg-[#2b7272] hover:bg-[#1f5d57]"
                        disabled={submittingPrivacy}
                    >
                        {submittingPrivacy ? 'Saving...' : 'Save Privacy Policy'}
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
                        className="my-2 text-white px-8 py-2 bg-[#2b7272] hover:bg-[#1f5d57]"
                        disabled={submittingTerms}
                    >
                        {submittingTerms ? 'Saving...' : 'Save Terms and Conditions'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PolicyAndTerms
