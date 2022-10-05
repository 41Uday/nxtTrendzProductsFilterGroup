import './index.css'

const FiltersGroup = props => {
  const searchListOfItems = event => {
    const {searchList} = props
    if (event.key === 'Enter') {
      searchList()
    }
  }

  const searchFunction = () => {
    const {searchClick} = props

    const searchValue = event => {
      searchClick(event.target.value)
    }

    return (
      <div className="card-1">
        <input
          type="search"
          className="input-name"
          placeholder="Search"
          onChange={searchValue}
          onKeyDown={searchListOfItems}
        />
        <div className="i-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
            alt="search icon"
            className="s-img"
          />
        </div>
      </div>
    )
  }

  const categoriesList = () => {
    const {categoryItem} = props
    return categoryItem.map(e => {
      const {clickButt1, isActive} = props
      const buttonClick = () => {
        clickButt1(e.categoryId)
      }
      const clsVal = isActive === e.categoryId ? 'head-1-f' : ''
      return (
        <li key={e.categoryId}>
          <button
            type="button"
            onClick={buttonClick}
            className="butt-list list-para"
          >
            <p className={clsVal}>{e.name}</p>
          </button>
        </li>
      )
    })
  }

  const ratingsListItems = () => {
    const {ratingItem} = props
    return ratingItem.map(e => {
      const {clickButt2, ratingActive} = props
      const buttonClick2 = () => {
        clickButt2(e.ratingId)
      }
      const clsVal2 = ratingActive === e.ratingId ? 'head-1-f' : ''
      return (
        <li key={e.ratingId}>
          <button
            type="button"
            onClick={buttonClick2}
            className="butt-list-2 list-para"
          >
            <img
              src={e.imageUrl}
              className="r-img"
              alt={`rating ${e.ratingId}`}
            />
            <p className={clsVal2}>& up</p>
          </button>
        </li>
      )
    })
  }

  const categoryList = () => (
    <>
      <h1 className="head-2-f">Category</h1>
      <ul className="list-type-cont">{categoriesList()}</ul>
    </>
  )

  const ratingList = () => (
    <>
      <h1 className="head-2-f">Rating</h1>
      <ul className="list-type-cont">{ratingsListItems()}</ul>
    </>
  )

  const {buttonDelete} = props

  return (
    <div className="filters-group-container">
      {/* Replace this element with your code */}
      {searchFunction()}
      {categoryList()}
      {ratingList()}
      <button type="button" className="button-1" onClick={buttonDelete}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
