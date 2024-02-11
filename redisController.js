const setData = async (req, res, client) => {
  const userId = req.body.userId;
  const message = req.body.message;
  const oldMsgCnt = await client.get(userId);
  const msgLength = message.length;
  let newMsgCnt = 0;

  if (oldMsgCnt) {
    newMsgCnt = parseInt(oldMsgCnt) + msgLength;
  } else {
    newMsgCnt = msgLength;
  }
  const redisRes = await client.set(userId, newMsgCnt);
  res.json({
    userId,
    totalLength: newMsgCnt,
  });
};

const deleteData = async (req, res, client) => {
  const userId = req.params.userId

  const redisRes = await client.del(userId);
  res.json({
    userId: userId,
    message: "Data deleted successfully!!"
  });
};
const getData = async (req, res, client) => {
  const userId = req.params.userId

  const redisRes = await client.get(userId);
  res.json({
    userId: userId,
    totalLength: parseInt(redisRes),
  });
};

module.exports = { setData, deleteData, getData };
