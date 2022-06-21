const fib = (x, hashmap) => {
  hashmap = hashmap || {};
  if (hashmap.hasOwnProperty(x)) return hashmap[x];
  if (x > 50) {
    return "LARGER THEN 50";
  }
  if (x < 2) return x;
  else return (hashmap[x] = fib(x - 1, hashmap) + fib(x - 2, hashmap));
};

const prevArr = [];

const getFibAtIndex = (req, res) => {
  const num = fib(req.params.number);
  prevArr.push(num);
  console.log(prevArr);
  res.send(200, `${num}`);
};

const getPrevRes = (req, res) => {
  res.send(prevArr.join(","));
};

module.exports = { getFibAtIndex, getPrevRes };
