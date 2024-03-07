'use client';

import * as actions from '@/actions'
import { Editor } from '@monaco-editor/react';
// via prisma you can pull the info for what a snippet is and all it's info
import type { Snippet } from '@prisma/client'
import { useState } from 'react';

interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {

    const [code, setCode] = useState(snippet.code)

    const handleEditorChange = (value: string = '') => {
        setCode(value)
    }

    const editSnippetAction = actions.editSnippet.bind(null,snippet.id, code)

    return <div>
        <Editor
            height='40vh'
            theme='vs-dark'
            language='javascript'
            defaultValue={snippet.code}
            options={{ minimap: {enabled: false}}}
            onChange={handleEditorChange}
        />
        <form action={editSnippetAction}>
            <button type='submit' className='p-2 border rounded'>Save</button>
        </form>
    </div>
}
