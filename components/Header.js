import { useContext } from 'react'
import Data from 'components/Data'
import Image from 'components/Image'

export default function ({ image }) {
  if (!image) {
    return null
  }

  const { post } = useContext(Data)

  return (
    <Image
      alt={post?.title}
      className="w-full h-auto object-cover"
      height={800}
      src={image.url}
      style={{ maxHeight: '600px' }}
      width={1600}
    />
  )
}
