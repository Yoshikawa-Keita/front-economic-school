import React from 'react'

interface VideoPlayerProps {
  src: string
  width?: string
  height?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  width = '100%',
  height = 'auto',
}) => {
  return (
    <video width={width} height={height} controls>
      <source src={src} type="video/mp4" />
      ウェブブラウザはvideoタグをサポートしていません。
    </video>
  )
}

export default VideoPlayer
