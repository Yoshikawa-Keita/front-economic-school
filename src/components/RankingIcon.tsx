import Image from 'next/image'
import React from 'react'

interface RankingIconProps {
  size?: number
  username: string
}

const RankingIcon = ({ size = 50, username }: RankingIconProps) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_S3_USER_PROFILE}/${username}.jpg`

  return (
    <div>
      <Image
        src={imageUrl}
        width={size}
        height={size}
        className="rounded-full border border-blue-400"
        alt={`${username}'s icon`}
      />
    </div>
  )
}

export default RankingIcon
