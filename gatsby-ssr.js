const React = require("react")

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  if (process.env.NODE_ENV !== `production` && process.env.NODE_ENV !== `test`)
    return null
  setHeadComponents([...adsbygoogle()])
}

adsbygoogle = () => {
  const adsbygoogle = (
    <script
      key="adsbygoogle"
      data-ad-client="ca-pub-3474413710491680"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
  )
  //   const adsbygoogleConfig = (
  //     <script
  //       key="adsbygoogle-config"
  //       dangerouslySetInnerHTML={{
  //         __html: `(adsbygoogle = window.adsbygoogle || []).push(
  //             {
  //                 google_ad_client: "ca-pub-3474413710491680",
  //                 enable_page_level_ads: true,
  //             });`,
  //       }}
  //     />
  //   )
  return [adsbygoogle]
}
