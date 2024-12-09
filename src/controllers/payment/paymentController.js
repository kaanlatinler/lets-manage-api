const Iyzipay = require("iyzipay");
const iyzico = require("../../cfg/cfg").iyzico;
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const iyzipay = new Iyzipay({
  apiKey: iyzico.apiKey,
  secretKey: iyzico.secretKey,
  uri: iyzico.baseUrl,
});

exports.subscribe = async (req, res) => {
  const {
    price,
    paidPrice,
    currency,
    basketId,
    paymentCard,
    buyer,
    shippingAddress,
    billingAddress,
    basketItems,
  } = req.body;

  console.log("req");

  const convId = "convId_" + uuidv4();

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: convId,
    price: price,
    paidPrice: paidPrice,
    currency: currency,
    installment: "1",
    basketId: basketId,
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: paymentCard,
    buyer: buyer,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems,
  };

  iyzipay.payment.create(request, (err, result) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({ err, success: false });
    }
    console.log("success", result);
    res.status(200).json({ result, success: true });
  });
};
