import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = ({ rhythm }) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    ul: {
      marginLeft: "1.75rem",
      marginRight: 0,
      marginTop: 100,
      paddingBottom: 0,
      paddingLeft: rhythm(1),
      paddingRight: 0,
      paddingTop: 0,
      marginBottom: "1.75rem",
      listStylePosition: "outside",
      listStyleImage: "none",
      listStyle: "disc",
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
