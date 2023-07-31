import React, { useState } from 'react'

interface RankingIconProps {
  size?: number
  username: string
}

const RankingIcon = ({ size = 50, username }: RankingIconProps) => {
  const [imageUrl, setImageUrl] = useState(
    `${process.env.NEXT_PUBLIC_S3_USER_PROFILE}/${username}.jpg`,
  )
  const defaultImageUrl = `${process.env.NEXT_PUBLIC_S3_USER_PROFILE}/default_image.png`

  return (
    <div>
      <img
        src={imageUrl}
        width={size}
        height={size}
        className="rounded-full border border-blue-400"
        alt={`${username}'s icon`}
        onError={() => setImageUrl(defaultImageUrl)}
      />
    </div>
  )
}

export default RankingIcon
