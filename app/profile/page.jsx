'use client'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [ myPosts,  setMyPosts ] = useState([])

  

  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setMyPosts(data)
    }
    
    if(session?.user.id){
      fetchMyPosts()
    }
  }, [session?.user.id])
  const handleEdit = (post) => {

  }

  const handleDelete = async post => {

  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile