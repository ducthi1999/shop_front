export default (path) => {
  if (path && path !== 'null')
    return `https://gamingshopvn-api.herokuapp.com/upload/${path}`
  else
    return '/images/product_default_img.png'
}