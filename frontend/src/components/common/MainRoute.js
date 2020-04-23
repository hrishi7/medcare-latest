import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Cart from "../Customers/Cart";
import OrderPlaced from "../Customers/OrderPlaced";
import MyOrder from "../Customers/MyOrder";
import Checkout from "../Customers/Checkout";
import Register from "./Register";

/**private routes */

import AdminDashboard from "../PrivateComponents/AdminDashboard";
import DeliveryPersonDashboard from "../PrivateComponents/DeliveryPersonDashboard";
import UserProfile from "../PrivateComponents/UserProfile";

/**seller private routes */
import UpdateProductStock from "../Sellers/UpdateProductStock";
import AddProduct from "../Sellers/AddProduct";
import SellerDashboard from "../Sellers/SellerDashboard";
import ManageOrders from "../Sellers/ManageOrders";
import SellerNotification from "../Sellers/SellerNotification";

/**private routes */
import PrivateRouteSeller from "../PrivateRoutes/PrivateRouteSeller";
import PrivateRouteUser from "../PrivateRoutes/PrivateRouteUser";
import PrivateRouteDelivery from "../PrivateRoutes/PrivateRouteDelivery";
import PrivateRouteAdmin from "../PrivateRoutes/PrivateRouteAdmin";

function MainRoute() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/cart" component={Cart} />
      <Switch>
        <PrivateRouteSeller
          exact
          path="/seller-dashboard"
          component={SellerDashboard}
        />
      </Switch>
      <Switch>
        <PrivateRouteSeller
          exact
          path="/update-stock"
          component={UpdateProductStock}
        />
      </Switch>
      <Switch>
        <PrivateRouteSeller
          exact
          path="/seller-notification"
          component={SellerNotification}
        />
      </Switch>
      <Switch>
        <PrivateRouteSeller
          exact
          path="/seller-manage-orders"
          component={ManageOrders}
        />
      </Switch>
      <Switch>
        <PrivateRouteSeller exact path="/addProduct" component={AddProduct} />
      </Switch>

      <Switch>
        <PrivateRouteAdmin
          exact
          path="/admin-dashboard"
          component={AdminDashboard}
        />
      </Switch>
      <Switch>
        <PrivateRouteDelivery
          exact
          path="/delivery-dashboard"
          component={DeliveryPersonDashboard}
        />
      </Switch>
      <Switch>
        <PrivateRouteUser exact path="/user-profile" component={UserProfile} />
      </Switch>
      <Switch>
        <PrivateRouteUser
          exact
          path="/payment-complete"
          component={OrderPlaced}
        />
      </Switch>
      <Switch>
        <PrivateRouteUser exact path="/myorder" component={MyOrder} />
        <PrivateRouteUser exact path="/checkout" component={Checkout} />
      </Switch>
    </div>
  );
}
export default MainRoute;
