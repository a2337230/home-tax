const express = require('express');
const path = require('path');
const houseRouter = require('./routes/house');
const app = express();

//设置跨域访问
app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  res.set("Access-Control-Allow-Origin","*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', houseRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('服务器启动成功')
})