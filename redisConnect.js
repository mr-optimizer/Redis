const redis = require("redis");

// const client = redis.createClient({
//   host: "127.0.0.1",
//   port: 6379,
// });

// client.on("error", (err) => {
//   console.error("Redis Error:", err);
// });

let client;

(async () => {
  client = redis.createClient();

  client.on("error", (error) => console.error(`Error : ${error}`));

  await client.connect();
})();

const setValue = async (key, value, expiryInSeconds) => {
  await client.set(key, value, expiryInSeconds);
};

const getValue = async (key) => {
  const value = await client.get(key);
  return value;
};

const deleteKey = async (key) => {
  await client.del(key);
};

module.exports = {
  setValue,
  getValue,
  deleteKey,
};
