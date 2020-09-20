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
  return [adsbygoogle]
}
