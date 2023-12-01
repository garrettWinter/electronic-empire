// utilities/completeOrderAction.js
export const completeOrderAction = async (accessToken: string, cart: [{
  productId: number,
  qty: number
}]) => {
  console.log("In completeOrderAction");
  console.log(accessToken);
  console.log(cart);
  try {
    const response = await fetch('/api/submitOrder', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        products: cart
      })
    });
    console.log("about to log response");
    console.log(response.body);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
};
