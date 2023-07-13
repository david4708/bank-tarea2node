const User = require('../models/user.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

const UserService = require('./../services/user.service');
const TransferService = require('./../services/transfer.service');
//instanciamos la clase
const userService = new UserService();

const transferService = new TransferService();

exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, accountNumberTransfer, accounNumberReceiver } = req.body;

  if (accounNumberReceiver === accountNumberTransfer) {
    return next(new AppError('who sends cannot  be who receives'));
  }
  const sendingUser = await userService.findOne(accountNumberTransfer);

  const receivingUser = await userService.findOne(accounNumberReceiver);

  if (sendingUser.amount < amount) {
    return next(new AppError('insufficient balance'));
  }
  const amountSendingUser = sendingUser.amount - amount;
  const amountReceivingUser = receivingUser.amount + amount;

  const updateSendingUserPromise = userService.updateAmount(
    sendingUser,
    amountSendingUser
  );

  const updateReceivingUserPromise = userService.updateAmount(
    receivingUser,
    amountReceivingUser
  );
  const transferPromise = transferService.create({
    amount,
    senderUserId: sendingUser.id,
    receiverUserId: receivingUser.id,
  });

  await Promise.all([
    updateSendingUserPromise,
    updateReceivingUserPromise,
    transferPromise,
  ]);

  return res.status(201).json({
    status: 'success',
    message: 'transfer done correctly',
  });
});
