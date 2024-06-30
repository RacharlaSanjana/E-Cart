import axios from 'axios';

export const fetchCart = (u_name) => async (dispatch) => {
  try {
    const response = await axios.post('https://miniprj-qqee.onrender.com/cart/fetchcart', { u_name });
    dispatch({ type: 'FETCH_CART', payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data.message === "No cart items found") {
      dispatch({ type: 'FETCH_CART', payload: [] }); // dispatch an empty cart
    } else {
      console.error('Error fetching cart:', error);
    }
  }
};

export const addItemToCart = (cartItem) => async (dispatch) => {
  try {
    const response = await axios.post('https://miniprj-qqee.onrender.com/cart/insertcart', cartItem);
    dispatch({ type: 'ADDITEM', payload: response.data });
    console.log('Item added to cart successfully');
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

export const updateCart = (u_name, p_id, qty) => async (dispatch) => {
  try {
    const response = await axios.put('https://miniprj-qqee.onrender.com/cart/updatecart', { u_name, p_id, qty });
    if (response.data.update === 'success') {
      dispatch({ type: 'UPDATEITEM', payload: { p_id, qty } });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

export const deleteItemFromCart = (u_name, p_id) => async (dispatch) => {
  try {
    const response = await axios.delete('https://miniprj-qqee.onrender.com/cart/deletecart', { data: { p_id, u_name } });
    if (response.data.delete === 'success') {
      dispatch({ type: 'DELITEM', payload: { p_id } });
    }
  } catch (error) {
    console.error('Error deleting item from cart:', error);
  }
};

export const incrementItemQuantity = (u_name, p_id) => async (dispatch, getState) => {
  const state = getState();
  const item = state.handleCart.find((item) => item.p_id === p_id);
  const newQty = item ? item.qty + 1 : 1;
  dispatch(updateCart(u_name, p_id, newQty));
};

export const decrementItemQuantity = (u_name, p_id) => async (dispatch, getState) => {
  const state = getState();
  const item = state.handleCart.find((item) => item.p_id === p_id);
  const newQty = item ? item.qty - 1 : 0;
  if (newQty > 0) {
    dispatch(updateCart(u_name, p_id, newQty));
  } else {
    dispatch(deleteItemFromCart(u_name, p_id));
  }
};
