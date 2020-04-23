const Order = require("../models/Order");
const SellerOrder = require("../models/SellerOrder");
const Payment = require("../models/Payment");

const Insta = require("instamojo-nodejs");
const url = require("url");

exports.payment = async (req, res) => {
  Insta.setKeys(
    "test_7bc09206a269adbb862311bb49a",
    "test_b47b41d4eb3edeaf64c904dc7e5"
  );

  const data = new Insta.PaymentData();
  Insta.isSandboxMode(true);

  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = req.body.redirect_url;
  data.email = req.body.email;
  // data.phone = req.body.phone;
  data.send_email = true;
  data.webhook = "http://www.example.com/webhook/";
  data.send_sms = false;
  data.allow_repeated_payments = false;

  //save order to order table with products details
  let newOrder = {
    purpose: data.purpose,
    userEmail: data.email,
    items: req.body.items,
    amount: data.amount,
    deliveryLocation: req.body.deliveryLocation,
    delivery: req.body.deliveryDate,
    payment: "pending",
    paymentMode: "online",
    status: "Ordered",
  };

  let orderResponse = await Order.create(newOrder);

  data.redirect_url += `&order_id=${orderResponse._id}`;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      //save order to
      // Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      const redirectUrl = responseData.payment_request.longurl;
      res.status(200).json(redirectUrl);
    }
  });
};

exports.paymentCallback = async (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;

  if (responseData.payment_id && responseData.payment_request_id) {
    //successfull payment

    //update the order payment status
    let updateOrder = {
      payment: "completed",
      status: "Received Order",
    };

    await Order.findOneAndUpdate({ _id: responseData.order_id }, updateOrder, {
      new: true,
      runValidators: true,
    });

    /**insertMany into seller order table with corresponding order id */

    let order = await Order.findOne({ _id: responseData.order_id });
    let sellerOrders = [];
    order.items.forEach((item) => {
      sellerOrders.push({
        orderId: order._id,
        medicineId: item.medicineId,
        medicineName: item.medicineName,
        quantity: item.quantity,
        sellerId: item.sellerId,
        status: "recieved",
      });
    });
    await SellerOrder.insertMany(sellerOrders);
    //testing
    Insta.getPaymentDetails(
      responseData.payment_request_id,
      responseData.payment_id,
      async function (error, response) {
        if (error) {
          // Some error
        } else {
          // save payment details
          let newPayment = {
            payment_id: response.payment_request.payment.payment_id,
            status: response.payment_request.status,
            amount: response.payment_request.payment.amount,
            userEmail: response.payment_request.payment.buyer_email,
            created_at: response.payment_request.payment.created_at,
            billing_instrument:
              response.payment_request.payment.billing_instrument,
            userId: responseData.user_id,
          };

          await Payment.create(newPayment);
        }
      }
    );

    // Redirect the user to payment complete page.
    return res.redirect("http://localhost:3000/payment-complete");
  }
};

exports.orderPlaceWithCod = async (req, res) => {
  let newOrder = {
    purpose: req.body.purpose,
    userEmail: req.body.email,
    items: req.body.items,
    amount: req.body.amount,
    deliveryLocation: req.body.deliveryLocation,
    delivery: req.body.deliveryDate,
    payment: "completed",
    paymentMode: "offline",
    status: "Received Order",
  };

  let insertedOrder = await Order.create(newOrder);
  /**insertMany into seller order table with corresponding order id */

  let sellerOrders = [];
  insertedOrder.items.forEach((item) => {
    sellerOrders.push({
      orderId: insertedOrder._id,
      medicineId: item.medicineId,
      medicineName: item.medicineName,
      quantity: item.quantity,
      sellerId: item.sellerId,
      status: "recieved",
    });
  });
  await SellerOrder.insertMany(sellerOrders);
  // Redirect the user to payment complete page.
  return res.json({ url: "http://localhost:3000/payment-complete" });
};
