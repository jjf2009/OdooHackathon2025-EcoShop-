const { Cart, CartItem } = require("../../models/Cart");
const Product  = require("../../models/Product")

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid data provided!" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Find existing cart item
    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (cartItem) {
      await cartItem.update({ quantity: cartItem.quantity + quantity });
    } else {
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
    }

    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Fetch Cart Items
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["id", "image", "title", "price", "salePrice"],
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!" });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Update Cart Item Quantity
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!cartItem) return res.status(404).json({ success: false, message: "Item not found" });

    await cartItem.update({ quantity });

    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const deleted = await CartItem.destroy({ where: { cartId: cart.id, productId } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, message: "Cart item deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem };
