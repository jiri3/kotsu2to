import React from "react"
import style from "./tag.module.css"

const Tag = ({ tags }) => {
  if (!tags || tags.length < 1) {
    return <ul className={style.tagContainer}></ul>
  }
  const tagElement = tags.map(value => {
    return (
      <li className={style.item} key={value}>
        <a href={"/tag/" + value}>{value}</a>
      </li>
    )
  })
  return <ul className={style.tagContainer}>{tagElement}</ul>
}

export default Tag
