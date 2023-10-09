import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const productDetailsApiUrl = 'https://apis.ccbp.in/products/'

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    isLoading: true,
    quantity: 1,
    errorMessage: '',
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params

      const jwtToken = Cookies.get('jwt_token')
      const url = `${productDetailsApiUrl}${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        this.setState({
          productDetails: data,
          isLoading: false,
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error_msg)
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        errorMessage: error.message,
      })
    }
  }

  incrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  renderProductDetailsView = () => {
    const {productDetails, quantity} = this.state
    const {
      id,
      image_url: imageUrl,
      title,
      brand,
      price,
      description,
      rating,
      total_reviews: totalReviews,
      availability,
      similar_products: similarProducts,
    } = productDetails

    return (
      <div className="product-details-container">
        <div className="top-container">
          <div className="product-image-container">
            <img
              src={imageUrl}
              alt={`product ${id}`}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <div className="product-info-container">
              <h1 className="product-title">{title}</h1>
              <p className="product-brand">by {brand}</p>
              <div className="product-rating-reviews-container">
                <div className="product-rating-container">
                  <p className="product-rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                </div>
                <p className="product-reviews">{totalReviews} Reviews</p>
              </div>
              <p className="product-price">Rs {price}/-</p>
              <p className="product-availability">{availability}</p>
              <p className="product-description">{description}</p>
              <div className="quantity-container">
                <button
                  type="button"
                  className="quantity-controller"
                  onClick={this.decrementQuantity}
                  data-testid="minus"
                >
                  <BsDashSquare />
                </button>
                <p className="quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-controller"
                  onClick={this.incrementQuantity}
                  data-testid="plus"
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button type="button" className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list">
            {similarProducts.map(similarProduct => (
              <SimilarProductItem
                key={similarProduct.id}
                similarProduct={similarProduct}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, errorMessage} = this.state

    if (isLoading) {
      return (
        <div className="product-item-details-container">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height="80" width="80" />
          </div>
        </div>
      )
    }

    if (errorMessage) {
      return (
        <div className="product-item-details-container">
          <div className="error-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
              alt="failure view"
              className="error-image"
            />
            <h1 className="error-message">{errorMessage}</h1>
            <button
              type="button"
              className="try-again-button"
              onClick={this.getProductDetails}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )
    }

    return this.renderProductDetailsView()
  }
}

export default ProductItemDetails

/* import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const productDetailsApiUrl = 'https://apis.ccbp.in/products/'

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    isLoading: true,
    quantity: 1,
    errorMessage: '',
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params

      const jwtToken = Cookies.get('jwt_token')
      const url = `${productDetailsApiUrl}${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        this.setState({
          productDetails: data,
          isLoading: false,
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error_msg)
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        errorMessage: error.message,
      })
    }
  }

  incrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  renderProductDetailsView = () => {
    const {productDetails, quantity} = this.state
    const {
      id,
      image_url: imageUrl,
      title,
      brand,
      price,
      description,
      rating,
      total_reviews: totalReviews,
      availability,
      similar_products: similarProducts,
    } = productDetails

    return (
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={imageUrl} alt={`product ${id}`} className="product-image" />
        </div>
        <div className="product-info-container">
          <h1 className="product-title">{title}</h1>
          <p className="product-brand">by {brand}</p>
          <div className="product-rating-reviews-container">
            <div className="product-rating-container">
              <p className="product-rating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="product-reviews">{totalReviews} Reviews</p>
          </div>
          <p className="product-price">Rs {price}/-</p>
          <p className="product-availability">{availability}</p>
          <p className="product-description">{description}</p>
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller"
              onClick={this.decrementQuantity}
            >
              <BsDashSquare />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller"
              onClick={this.incrementQuantity}
            >
              <BsPlusSquare />
            </button>
          </div>
          <button type="button" className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProducts.map(similarProduct => (
            <SimilarProductItem
              key={similarProduct.id}
              similarProduct={similarProduct}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, errorMessage} = this.state

    if (isLoading) {
      return (
        <div className="product-item-details-container">
          <div className="loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="80" width="80" />
          </div>
        </div>
      )
    }

    if (errorMessage) {
      return (
        <div className="product-item-details-container">
          <div className="error-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
              alt="error"
              className="error-image"
            />
            <h1 className="error-message">{errorMessage}</h1>
            <button
              type="button"
              className="try-again-button"
              onClick={this.getProductDetails}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.renderProductDetailsView()
  }
}

export default ProductItemDetails
 */
