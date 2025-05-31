const truncatText = (text) => {
    return text.length > 200 ? text.slice(0, 120) + "..." : text
}

export default truncatText;