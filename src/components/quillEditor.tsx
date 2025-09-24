'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamically import Quill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface QuillEditorProps {
    value?: string
    onChange?: (value: string) => void
    readOnly?: boolean
    placeholder?: string
    className?: string
}

const QuillEditor: React.FC<QuillEditorProps> = ({
    value = '',
    onChange,
    readOnly = false,
    placeholder = 'Write something...',
    className = '',
}) => {
    // Toolbar options
    const modules = useMemo(() => ({
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'], // remove formatting
        ],
    }), [])

    const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link']

    return (
        <div className={className}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
        </div>
    )
}

export default QuillEditor
