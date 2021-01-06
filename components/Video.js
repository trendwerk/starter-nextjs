export default function Video({ src, title }) {
  return (
    <div className="relative pb-9/16">
      <iframe
        allow="fullscreen"
        className="h-full w-full top-0 left-0 absolute rounded shadow bg-black"
        frameBorder={0}
        loading="lazy"
        src={src}
        title={title}
      />
    </div>
  )
}
