"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([])

  const userName = useSearchParams().get("name")

  const fetchUserPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`)
    const data = await response.json()

    setUserPosts(data)
  }

  useEffect(() => {
    if (params?.id) fetchUserPosts()
  }, [params?.id])

  return (
    <Profile
      name={userName}
      data={userPosts}
      desc={`Welcome to ${userName}'s profile profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
    />
  )
}

export default UserProfile
