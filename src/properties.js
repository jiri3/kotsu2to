const categories = {
  tech: { label: "テック" },
  random_note: { label: "雑記" },
  scraps: {label:"スクラップ"}
}

const getCategoriesName = () => Object.keys(categories)
const findLabelByName = name => categories[name].label

exports.getCategoriesName = getCategoriesName
exports.findLabelByName = findLabelByName
