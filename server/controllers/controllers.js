let client;
const injectConnection = (connection) => {
  client = connection;
};

const fib = (x, hashmap) => {
  hashmap = hashmap || {};
  if (hashmap.hasOwnProperty(x)) return hashmap[x];
  if (x > 50) {
    return "LARGER THEN 50";
  }
  if (x < 2) return x;
  else return (hashmap[x] = fib(x - 1, hashmap) + fib(x - 2, hashmap));
};

const getFibAtIndex = (req, res) => {
  const date = new Date();
  const num = fib(req.params.number);
  client
    .db("fib")
    .collection("prevFibNumbers")
    .insertOne({
      number: parseInt(req.params.number),
      result: num,
      createdDate: date.getTime(),
    });
  res.status(200).json({ result: num });
};

const getPrevRes = async (req, res) => {
  const cursor = client.db("fib").collection("prevFibNumbers").find({});
  const results = [];
  await cursor.forEach(({ number, result, createdDate }) =>
    results.push({ number, result, createdDate })
  );
  const resObj = { message: "success", results };
  res.status(200).json(resObj);
};

module.exports = { getFibAtIndex, getPrevRes, injectConnection };
