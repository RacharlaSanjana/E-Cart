// reducers/cart.js
const handleCart = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_CART':
        return action.payload;
      case 'ADDITEM':
        return [...state, action.payload];
      case 'UPDATEITEM': {
        return state.map((item) =>
          item.p_id === action.payload.p_id
            ? { ...item, qty: action.payload.qty }
            : item
        );
      }
      case 'DELITEM':
        return state.filter((item) => item.p_id !== action.payload.p_id);
      default:
        return state;
    }
  };
  
  export default handleCart;
  