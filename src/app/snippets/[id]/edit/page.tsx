import SnippetEditForm from "@/components/snippet-edit-form"
import { db } from "@/db"
import { notFound } from "next/navigation"


interface SnippetEditPageProps {
    params: {
        id: string
    }
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
    const id = parseInt(props.params.id)
    const snippet = await db.snippet.findFirst({
        where: {id: id}
    })

    if(!snippet){
        return notFound()
    }

    return <div>
        Editting snippet with id {snippet.title}
        <SnippetEditForm snippet={snippet}/>
    </div>
}
