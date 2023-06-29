'use client';

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const router = useRouter()
  // const {data: session } = useSession()

  const searchParams = useSearchParams()
  // 通过 url 参数 '/update-prompt?id=xxx' 获取id
  const promptId = searchParams.get('id')

  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])

  const editPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert('Prompt ID not found')

    try{
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          // userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      console.log('---editPrompt:', response)
      if(response.ok){
        router.push("/profile")
      }
    }catch(error){
      console.log(error)
    }finally{
      setSubmitting(false)
    }
  }
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt