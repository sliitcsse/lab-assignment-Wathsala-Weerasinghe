import { Customer, Trader } from "./data.js";

export const createTraderProfile = (ctx, next) => {
  const { userId } = ctx.params;

  for (const customer of Customer) {
    if (parseInt(customer.userId) === parseInt(userId)) {
      customer.role = "Trader";

      const newTrader = {
        userId: parseInt(userId),
        items: [],
        customers: [],
        promotions: [],
      };

      Trader.push(newTrader);

      ctx.body = JSON.stringify(newTrader);
      ctx.body = {
        message: "Trader created successfully!",
        status: "Success",
      };
      next();
      return;
    }
  }
  ctx.body = {
    message: "Customer not found!",
    status: "Error",
  };
  next();
};

export const addItem = (ctx, next) => {
  const { userId, productId, productName, price, quantity } = ctx.params;

  for (const trader of Trader) {
    if (parseInt(trader.userId) === parseInt(userId)) {
      trader.items.push({
        productId: parseInt(productId),
        productName: productName,
        price: parseInt(price),
        quantity: parseInt(quantity),
      });
      ctx.body = {
        message: "Item is Successfully added!",
        status: "Success",
      };
      next();
      return;
    }
  }
  ctx.body = {
    message: "Trader is not found!",
    status: "Error",
  };
  next();
};

export const editItem = (ctx, next) => {
  const { userId, productId, productName, price, quantity } = ctx.params;

  for (const trader of Trader) {
    if (parseInt(trader.userId) === parseInt(userId)) {
      for (const item of trader.items) {
        if (parseInt(item.productId) === parseInt(productId)) {
          item.productName = productName;
          item.price = parseInt(price);
          item.quantity = parseInt(quantity);
          ctx.body = {
            status: "Success",
            item: {
              ...item,
            },
          };
          next();
          return;
        }
      }
    }
  }
  ctx.body = {
    message: "Trader is not found!",
    status: "Error",
  };
  next();
};

export const viewInventory = (ctx, next) => {
  const { userId } = ctx.params;

  for (const trader of Trader) {
    if (parseInt(trader.userId) === parseInt(userId)) {
      ctx.body = {
        inventory: [...trader.items],
      };
      next();
      return;
    }
  }
  ctx.body = {
    message: "Trader is not found!",
    status: "Error",
  };
  next();
};

export const viewCustomers = (ctx, next) => {
  const { userId } = ctx.params;
  let isTrader = false;
  for (const trader of Trader) {
    if (parseInt(trader.userId) === parseInt(userId)) {
      isTrader = true;
    }
  }

  if (isTrader) {
    const customers = [];

    for (const customer of Customer) {
      customers.push(customer);
    }

    ctx.response.body = JSON.stringify({
      status: "Success",
      customers: customers,
    });
  } else {
    ctx.body = {
      message: "Trader is not found!",
      status: "Error",
    };
  }

  next();
};

export const addPromotions = (ctx, next) => {
  const { userId, couponCode, percentage } = ctx.params;

  for (const trader of Trader) {
    if (parseInt(trader.userId) === parseInt(userId)) {
      trader.promotions.push({
        couponCode: couponCode,
        percentage: parseInt(percentage),
      });
      ctx.body = {
        message: "Promotion is Successfully added!",
        status: "Success",
      };
      next();
      return;
    }
  }
};

export const viewPromotions = (ctx, next) => {
  const { userId } = ctx.params;

  for (const trader of Trader) {
    if (parseInt(trader.userId) === parseInt(userId)) {
      ctx.body = {
        message: "Promotions viewed",
        status: "Success",
        promotions: [...trader.promotions],
      };
      next();
      return;
    }
  }
};
