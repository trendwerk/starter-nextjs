export default function Analytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${process.env.TRACKING_ID}', {
            page_path: window.location.pathname
          });
        `,
        }}
      />
    </>
  )
}
