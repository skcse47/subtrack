const {createClient} = require("redis");
 const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

redisClient.on("error", (err) => { console.error("Redis client error", err)});

(async () => {
    try {
        await redisClient.connect();
        console.log("Connected to redis")
    } catch (error) {
        console.log("Failed to connect", error)
    }
})();

module.exports = redisClient;