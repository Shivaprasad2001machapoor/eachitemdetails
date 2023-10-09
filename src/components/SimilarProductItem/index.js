// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProduct} = props
  const {image_url: imageUrl, title, style, price, description} = similarProduct

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-image"
      />
      <h1 className="similar-product-title">{title}</h1>
      <p className="similar-product-style">{style}</p>
      <p className="similar-product-price">Rs {price}/-</p>
      <p className="similar-product-description">{description}</p>
    </li>
  )
}

export default SimilarProductItem
