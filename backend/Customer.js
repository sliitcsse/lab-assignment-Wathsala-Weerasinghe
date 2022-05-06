import { Customer, Trader } from "./data.js";

export const createCustomerProfile = (ctx, next) => {
  const { username, email, password } = ctx.params;

  for (const customer of Customer) {
    if (customer.name === username) {
      ctx.body = {
        message: "Customer already exists!",
        status: "Error",
      };
      return;
    }
  }

  const newCustomer = {
    userId: Customer.length + 1,
    username,
    email,
    password,
    cartItemsId: [],
    wishListItemsIds: [],
    purchaseItemsIds: [],
    role: "Customer",
  };

  Customer.push(newCustomer);

  ctx.status = 201;
  ctx.response.body = {
    message: "Customer created successfully!",
    status: "Success",
    userId: JSON.stringify(newCustomer.userId),
  };
  next();
};

export const viewItems = (ctx, next) => {
  const products = [];

  for (const trader of Trader) {
    for (const product of trader.items) {
      products.push({
        ...product,
        traderId: trader.userId,
      });
    }
  }

  ctx.response.body = JSON.stringify({
    status: "Success",
    products: products,
  });
  next();
};

export const addToCart = (ctx, next) => {
  const { userId, productId, traderId } = ctx.params;

  const cusIndex = Customer.findIndex(
    (customer) => parseInt(customer.userId) === parseInt(userId)
  );

  if (cusIndex === -1) {
    ctx.response.body = {
      message: "Customer is not exists!",
      status: "Error",
    };
    return;
  }

  const traderIndex = Trader.findIndex((trader) => {
    return parseInt(trader.userId) === parseInt(traderId);
  });

  if (traderIndex === -1) {
    ctx.response.body = {
      message: "Trader ID is not exists!",
      status: "Error",
    };
    return;
  }

  const productIndex = Trader[traderIndex].items.findIndex((product) => {
    return parseInt(product.productId) === parseInt(productId);
  });

  if (productIndex === -1) {
    ctx.response.body = {
      message: "Product ID is not exists!",
      status: "Error",
    };
    return;
  }

  Customer[cusIndex].cartItemsId.push({
    productId,
    traderId,
  });

  ctx.response.body = {
    message: "Product is successfully added to the cart!",
    status: "Success",
    cartItemsId: Customer[cusIndex].cartItemsId,
  };
  next();
};

export const addToWishList = (ctx, next) => {
  const { userId, productId, traderId } = ctx.params;

  const cusIndex = Customer.findIndex(
    (customer) => parseInt(customer.userId) === parseInt(userId)
  );

  if (cusIndex === -1) {
    ctx.response.body = {
      message: "Customer is not exists!",
      status: "Error",
    };
    return;
  }

  const traderIndex = Trader.findIndex((trader) => {
    return parseInt(trader.userId) === parseInt(traderId);
  });

  if (traderIndex === -1) {
    ctx.response.body = {
      message: "Trader ID is not exists!",
      status: "Error",
    };
    return;
  }

  const productIndex = Trader[traderIndex].items.findIndex((product) => {
    return parseInt(product.productId) === parseInt(productId);
  });

  if (productIndex === -1) {
    ctx.response.body = {
      message: "Product ID is not exists!",
      status: "Error",
    };
    return;
  }

  Customer[cusIndex].wishListItemsIds.push({
    productId,
    traderId,
  });

  ctx.response.body = {
    message: "Product is successfully added to the WishList!",
    status: "Success",
    wishListItemsIds: Customer[cusIndex].wishListItemsIds,
  };
  next();
};

export const viewCart = (ctx, next) => {
  const { userId } = ctx.params;

  const cusIndex = Customer.findIndex(
    (customer) => parseInt(customer.userId) === parseInt(userId)
  );

  if (cusIndex === -1) {
    ctx.response.body = {
      message: "Customer is not exists!",
      status: "Error",
    };
    return;
  }

  const cartItems = [];

  for (const cartItem of Customer[cusIndex].cartItemsId) {
    const traderItems =
      Trader[
        Trader.findIndex(
          (trader) => parseInt(trader.userId) === parseInt(cartItem.traderId)
        )
      ].items;

    const cartListItem = traderItems.find(
      (product) => parseInt(product.productId) === parseInt(cartItem.productId)
    );

    cartItems.push(cartListItem);
  }

  ctx.response.body = {
    status: "Success",
    cartItems: cartItems,
  };
  next();
};

export const viewWishList = (ctx, next) => {
  const { userId } = ctx.params;

  const cusIndex = Customer.findIndex(
    (customer) => parseInt(customer.userId) === parseInt(userId)
  );

  if (cusIndex === -1) {
    ctx.response.body = {
      message: "Customer is not exists!",
      status: "Error",
    };
    return;
  }

  const wishListItems = [];

  for (const wishItem of Customer[cusIndex].wishListItemsIds) {
    const traderItems =
      Trader[
        Trader.findIndex(
          (trader) => parseInt(trader.userId) === parseInt(wishItem.traderId)
        )
      ].items;

    const wishListItem = traderItems.find(
      (product) => parseInt(product.productId) === parseInt(wishItem.productId)
    );

    wishListItems.push(wishListItem);
  }

  ctx.response.body = {
    status: "Success",
    wishListItemsIds: wishListItems,
  };
  next();
};

export const purchase = (ctx, next) => {
  const { userId, productId } = ctx.params;

  const cusIndex = Customer.findIndex(
    (customer) => parseInt(customer.userId) === parseInt(userId)
  );

  if (cusIndex === -1) {
    ctx.response.body = {
      message: "Customer is not exists!",
      status: "Error",
    };
    return;
  }

  const cartItemsIds = Customer[cusIndex].cartItemsId;

  const cartItemIndex = cartItemsIds.findIndex(
    (product) => parseInt(product.productId) === parseInt(productId)
  );

  if (cartItemIndex === -1) {
    ctx.response.body = {
      message: "Product is not exist in the cart!",
      status: "Error",
    };
    return;
  }

  const cartItem = cartItemsIds[cartItemIndex];
  Customer[cusIndex].cartItemsId.splice(cartItemIndex, 1);

  const traderIndex = Trader.findIndex(
    (trader) => parseInt(trader.userId) === parseInt(cartItem.traderId)
  );

  if (traderIndex === -1) {
    ctx.response.body = {
      message: "Trader ID is not exists!",
      status: "Error",
    };
    return;
  }

  const traderItemIndex = Trader[traderIndex].items.findIndex(
    (product) => parseInt(product.productId) === parseInt(productId)
  );

  if (traderItemIndex === -1) {
    ctx.response.body = {
      message: "Product is not exist in trader!",
      status: "Error",
    };
    return;
  }

  const traderItem = Trader[traderIndex].items[traderItemIndex];

  Trader[traderIndex].customers.push({
    userId: Customer[cusIndex].userId,
    username: Customer[cusIndex].username,
  });

  ctx.response.body = {
    message: "Product purchased successfully",
    status: "Success",
    product: traderItem,
  };
  next();
};

export const Login = (ctx, next) => {
  const { username, password } = ctx.params;

  for (const customer of Customer) {
    if (customer.username === username && customer.password === password) {
      ctx.status = 200;
      ctx.response.body = {
        message: "Customer logged successfully!",
        status: "Success",
        userId: JSON.stringify(customer.userId),
        userrole: customer.role,
      };
      next();
      return;
    }
  }
};
