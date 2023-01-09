const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((likes, thisblog) => likes + thisblog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((x, y) => (x.likes > y.likes ? x : y))
}

const mostLikes = (blogs) => {

}

const mostBlogs = (blogs) => {
  const array = []
  blogs.forEach(element => {
    if (array.filter(e => e.author === element.author).length === 0) {
      array.push({
        author: element.author,
        blogs: 1
      })
    } else {
      upd_obj = array.findIndex((obj => obj.author == element.author));
      array[upd_obj].blogs += 1;
    }
  })
  const max = array.reduce(function(prev, current) {
    return (prev.blogs > current.blogs) ? prev : current})
  return max
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}