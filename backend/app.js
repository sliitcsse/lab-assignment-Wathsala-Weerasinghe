import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import cors from "@koa/cors";
import {
  createCustomerProfile,
  viewItems,
  addToCart,
  addToWishList,
  viewCart,
  viewWishList,
  purchase,
  Login,
} from "./Customer.js";
import {
  createTraderProfile,
  addItem,
  editItem,
  viewInventory,
  viewCustomers,
  addPromotions,
  viewPromotions,
} from "./Trader.js";

const app = new Koa();
const router = new Router();

router
  //customer
  .post(
    "/Customer/create-new-customer/:username/:email/:password",
    createCustomerProfile
  )
  .get("/Customer/get-items", viewItems)
  .post("/Customer/add-to-cart/:userId/:productId/:traderId", addToCart)
  .post("/Customer/add-to-wishlist/:userId/:productId/:traderId", addToWishList)
  .get("/Customer/get-cart-items/:userId", viewCart)
  .get("/Customer/get-wishlist-items/:userId", viewWishList)
  .post("/Customer/purchase-items/:userId/:productId", purchase)
  .post("/Customer/login-customer/:username/:password", Login)

  //trader
  .post("/Trader/create-new-trader/:userId", createTraderProfile)
  .post(
    "/Trader/add-items/:userId/:productId/:productName/:price/:quantity",
    addItem
  )
  .post(
    "/Trader/edit-items/:userId/:productId/:productName/:price/:quantity",
    editItem
  )
  .get("/Trader/get-items/:userId", viewInventory)
  .get("/Trader/get-customers/:userId", viewCustomers)
  .post("/Trader/add-promotion/:userId/:couponCode/:percentage", addPromotions)
  .get("/Trader/view-promotion/:userId", viewPromotions);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(json)
  .use(bodyParser)
  .use(cors);

app.listen(3000);
