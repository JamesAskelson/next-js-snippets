'use server';

import { db } from "@/db";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {id},
        data: {code}
    })

    redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {id}
    })
    revalidatePath('/')
    redirect('/')
}

export async function createSnippet(formState: {message: string},formData: FormData) {
    try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get('title')
    const code = formData.get('code')

    if(typeof title !== 'string' || title.length < 3) {
        return {
            message: 'Title must be longer'
        }
    }

    if(typeof code !== 'string' || code.length < 10) {
        return {
            message: 'Code must be longer'
        }
    }

    // if valid, create new record in the db
    const snippet = await db.snippet.create({
        data: {
            title: title,
            code: code
        }
    })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: 'Something went wrong...'
            }
        }
    }

    // return to the homepage/new snippet page
    
    revalidatePath('/')
    redirect('/');
}
