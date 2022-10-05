import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],

    activeOptionId: sortbyOptions[0].optionId,
    isActive: '',
    ratingActive: '',
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  clickButt1 = isActive => {
    this.setState({isActive}, this.getProducts)
  }

  clickButt2 = ratingActive => {
    this.setState({ratingActive}, this.getProducts)
  }

  searchClick = value => {
    this.setState({searchInput: value})
    console.log(value)
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.progress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, isActive, ratingActive, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${isActive}&title_search=${searchInput}&rating=${ratingActive}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    const givenLength = productsList.length > 0

    // TODO: Add No Products View

    if (givenLength) {
      return (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="all-img"
        />
        <h1 className="all-head">No Products Found</h1>
        <p className="all-para">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  buttonDelete = () => {
    this.setState({ratingActive: ''}, this.getProducts)
    this.setState({isActive: ''}, this.getProducts)
    this.setState({searchInput: ''}, this.getProducts)
  }

  // TODO: Add failure view

  renderFailureView = () => (
    <div className="all-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="products failure"
        className="all-img"
      />
      <h1 className="all-head">Oops! Something Went Wrong</h1>
      <p className="all-para">
        We are having some trouble processing your request.Please try again.
      </p>
    </div>
  )

  switchAllMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.progress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  searchList = () => {
    this.getProducts()
  }

  render() {
    const {isActive, ratingActive} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}

        <FiltersGroup
          categoryItem={categoryOptions}
          clickButt1={this.clickButt1}
          isActive={isActive}
          ratingItem={ratingsList}
          clickButt2={this.clickButt2}
          ratingActive={ratingActive}
          searchClick={this.searchClick}
          buttonDelete={this.buttonDelete}
          searchList={this.searchList}
        />

        {this.switchAllMethods()}
      </div>
    )
  }
}

export default AllProductsSection
