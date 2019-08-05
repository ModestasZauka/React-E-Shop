import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import "./index.scss";
import { ROUTES } from "../../../constants";
import shop from "../../../shop";

//HOC(Higher Order Component) example
function withHoc(Component) {
  function WrappedComponent(props) {
    return <Component {...props} text={"Amazing"} />;
  }
  return WrappedComponent;
}

function ProductCard({
  name,
  image,
  description,
  price,
  currencySymbol,
  id,
  isFavorite,
  cartCount,
  toggleFavorite,
  addToCart,
  removeFromCart,
  history
}) {
  const className = isFavorite
    ? "ProductCard ProductCard__favorite"
    : "ProductCard";
  const completePurchase = () => history.push(ROUTES.cart);

  return (
    <div className={className}>
      <div className="ProductCard--image">
        <img alt={`product: ${name}`} src={image} />
      </div>
      <div className="ProductCard--info">
        <Link to={`/product/${id}`}>
          <h3>{name}</h3>
        </Link>
        <p>{description}</p>
      </div>
      <div className="ProductCard--cta">
        <p>
          <span>Price:</span> <span>{`${price}${currencySymbol}`}</span>
        </p>
        <div>
          <button type="button" onClick={() => toggleFavorite(id)}>
            <span role="img" aria-label="add to favorites heart illustration">
              {isFavorite ? "❌" : "💜"}
            </span>
          </button>
          {!!cartCount && (
            <button type="button" onClick={() => removeFromCart(id)}>
              <span role="img" aria-label="remove from cart illustration">
                🗑️
              </span>
            </button>
          )}
          <button type="button" onClick={() => addToCart(id)}>
            <span role="img" aria-label="add to cart illustration">
              🛒
            </span>
            {!!cartCount && (
              <div className="ProductCard--cta-count">{cartCount}</div>
            )}
          </button>
          <button type="button" onClick="completePurchase">
            {""}
            Complete Purchase{""}
          </button>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state, { id }) {
  const item = shop.selectors.getCartItem(state, id);

  return {
    cartCount: item ? item.count : 0,
    isFavorite: shop.selectors.isProductFavorite(state, id)
  };
}

function mapDispatchToProps(dispatch, { id }) {
  return bindActionCreators({
    addToCart: shop.actions.addToCart,
    dispatch,
    removeFromCart: shop.actions.removeFromCart,
    dispatch,
    toggleFavorite: shop.actions.toggleFavorite,
    dispatch
  });
}
const enchance = compose(
  withHoc,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enchance(ProductCard);
