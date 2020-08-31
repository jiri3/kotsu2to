import CMS from "netlify-cms-app"

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    return entry.get("data").set("updatedate", new Date())
  },
})
