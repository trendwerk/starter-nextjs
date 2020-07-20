import { useContext } from 'react'
import Context from 'components/Context'
import Image from 'components/Image'

export default function({ image }) {
  if (!image) {
    return false;
  }

  const { post } = useContext(Context)

  return (
    <Image
      alt={post?.title}
      className="w-full h-auto mb-8 sm:mb-10 lg:mb-16 object-cover"
      height='800'
      src={image.url}
      style={{ maxHeight: '600px' }}
      width='1600'
    />
  )
}
