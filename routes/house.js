const express = require('express');
const router = express.Router();
const conn = require('./../db/db');
// 接口连通性测试
router.get('/', (req,res) => {
  res.send("你好")
})
// 注册添加用户接口
router.post('/api/adduser', (req, res) => {
  let user = req.body.user;
  let password = req.body.password;
  let name = req.body.name;
  let sex = req.body.sex;
  let tel = req.body.tel;
  let email = req.body.email;
  let birthday = req.body.birthday;
  let post = req.body.post;
  console.log(user)
  // 查询是否有重复
  const sqlStr = `SELECT * FROM users WHERE user = '${user}' LIMIT 1`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '数据库连接失败'});
    } else {
      if (results[0]) {
        res.json({err_code: 1, message: '用户已存在'});
      } else {
        const sqlStr = "INSERT INTO users (user,password,name,sex,tel,email,birthday,post) VALUES(?,?,?,?,?,?,?,?)";
        const params = [user,password,name,sex,tel,email,birthday,post];
        conn.query(sqlStr, params, (error, results, fields) => {
          if(!error) {
            res.json({message: '添加用户成功'})
          } else {
            res.json({message: '添加用户失败'})
          }
        })
      }
    }
  })
})
// 用户信息修改
router.post('/api/edituser', (req, res) => {
  let id = req.body.id;
  let user = req.body.user || "";
  let password = req.body.password || "";
  let name = req.body.name || "";
  let sex = req.body.sex || "";
  let tel = req.body.tel || "";
  let email = req.body.email || "";
  let birthday = req.body.birthday || "";
  let post = req.body.post || "";
  const sqlStr = `UPDATE users SET user = '${user}', password = '${password}', name = '${name}', sex = '${sex}', tel = '${tel}', birthday = '${birthday}', post = '${post}', email = '${email}' WHERE id = '${id}'`
  conn.query(sqlStr, (error, results, fields) => {
    if(!error) {
      res.json({message: '修改用户成功'})
    } else {
      res.json({message: '修改用户失败'})
    }
  })
})
// 用户信息删除
router.post('/api/deluser', (req, res) => {
  let id = req.body.id;
  console.log(req.body)
  let sqlStr = `DELETE FROM users WHERE id = ${id}`
  conn.query(sqlStr, (error, results, fields) => {
    if(!error) {
      res.json({message: '删除用户成功'})
    } else {
      res.json({message: '删除用户失败'})
    }
  })
})  

// 查询用户
router.get('/api/allUser', (req, res) => {
  let sqlStr = 'SELECT * FROM users';
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '数据库连接失败'});
    } else {
      // delete results.password
      let result = []
      results.forEach(item => {
        let arr = {
          id: item.id,
          user: item.user,
          name: item.name,
          sex: item.sex,
          tel: item.tel,
          post: item.post,
          birthday: item.birthday,
          email: item.email
        }
        result.push(arr)
      })
      console.log(result)
      res.json({
        success: 200,
        message: result
      });
    }
  })
})
// 登录接口
router.post('/api/loginUser', (req, res) => {
  let user = req.body.user;
  let password = req.body.password;
  // 查询用户名是否存在
  const userStr = `SELECT * FROM users WHERE user = '${user}' LIMIT 1`;
  console.log(userStr)
  conn.query(userStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: "数据库连接失败"})
    } else {
      if (results[0]) {
        console.log(results[0].user)
        results =results[0];
        if (results.password != password) {
          res.json({err_code: 2,message: "密码错误"})
        } else {
          delete results.password
          res.json({
            success: 200,
            message: results
          });
        }
      } else {
        res.json({err_code: 1,message: "用户名不存在,请联系管理员索要"})
      }
    }
  })
})
// 增量房添加接口
router.post('/api/addHouse', (req,res) => {
  let transType = req.body.transType;
  let buyer = req.body.houseInfo.name;
  let buyerId = req.body.houseInfo.userid;
  let vendor = req.body.houseInfo.sellername;
  let vendorId = req.body.houseInfo.selleruserid;
  let builder = req.body.houseInfo.builder;
  let userHouse = req.body.houseInfo.userHouse;
  let family = req.body.houseInfo.family;
  let address = req.body.houseInfo.address;
  let invoice = req.body.houseInfo.invoice;
  let builderInvoice = req.body.houseInfo.builderInvoice;
  let date = req.body.houseInfo.date;
  let direction = req.body.houseInfo.direction;
  let area = req.body.houseInfo.area;
  let price = req.body.houseInfo.price;
  let tax = req.body.houseInfo.tax;
  let tax1 = req.body.taxdata.tax1;
  let tax2 = req.body.taxdata.tax2;
  let tax3 = req.body.taxdata.tax3;
  let tax4 = req.body.taxdata.tax4;
  let tax5 = req.body.taxdata.tax5;
  let tax6 = req.body.taxdata.tax6;
  let tax7 = req.body.taxdata.tax7;
  let tax8 = req.body.taxdata.tax8;
  let tax9 = req.body.taxdata.tax9;
  let tax10 = req.body.taxdata.tax10;
  let vendorprice = req.body.price.seller;
  let buyerprice = req.body.price.purchaser;
  // 保存到数据库
  // console.log(transType,buyer,buyerId,vendor,vendorId,builder,userHouse,family,address,invoice,builderInvoice,date,direction,area,price,tax,tax1,tax2,tax3,tax4,tax5,tax6,tax7,tax8,tax9,tax10)
  const sqlStr = "INSERT INTO houseTax (type,buyer,buyerId,vendor,vendorId,builder,userHouse,family,address,invoice,builderInvoice,date,direction,area,price,tax,tax1,tax2,tax3,tax4,tax5,tax6,tax7,tax8,tax9,tax10,vendorprice,buyerprice) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [transType,buyer,buyerId,vendor,vendorId,builder,userHouse,family,address,invoice,builderInvoice,date,direction,area,price,tax,tax1,tax2,tax3,tax4,tax5,tax6,tax7,tax8,tax9,tax10,vendorprice,buyerprice];
  conn.query(sqlStr, params, (error, results, fields) => {
    if(!error) {
      res.json({
        succrss: 200,
        message: "信息保存成功"
      })
    } else {
      res.json({
        err_code: 0,
        message: "信息保存失败"
      })
    }
  })
})
// 全部房产交易查询
router.post('/api/allDeal', (req, res) => {
  const sqlStr = 'SELECT * FROM housetax';
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: "数据库连接失败"})
    } else {
      res.json({success: 200,message: results})
    }
  })
})
// 增量房查询
router.post('/api/newDeal', (req, res) => {
  const sqlStr = 'SELECT * FROM housetax WHERE type < 2';
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: "数据库连接失败"})
    } else {
      res.json({success: 200,message: results})
    }
  })
})
// 存量房查询
router.post('/api/oldDeal', (req, res) => {
  const sqlStr = 'SELECT * FROM housetax WHERE type >= 2 and type < 4';
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: "数据库连接失败"})
    } else {
      res.json({success: 200,message: results})
    }
  })
})
// 房屋赠与查询
router.post('/api/bestDeal', (req, res) => {
  const sqlStr = 'SELECT * FROM housetax WHERE type = 4';
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: "数据库连接失败"})
    } else {
      res.json({success: 200,message: results})
    }
  })
})
// 添加投诉
router.post('/api/complain', (req, res) => {
  let submitter = req.body.submitter;
  let title = req.body.title;
  let plain = req.body.plain;
  let accused = req.body.accused;
  let rate = req.body.rate;
  let lead = req.body.lead;
  let editorContent = req.body.editorContent;
  let type = req.body.type;

  const sqlStr = "INSERT INTO complain (submitter,title,plain,accused,rate,lead,editorContent,type) VALUES(?,?,?,?,?,?,?,?)";
  const params = [submitter,title,plain,accused,rate,lead,editorContent,type];
  conn.query(sqlStr, params, (error, results, fields) => {
    if(!error) {
      res.json({success: 200, message: '上报投诉成功'})
    } else {
      res.json({err_code: 0, message: '上报投诉失败'})
    }
  })
      
  
})
// 查询投诉
router.get('/api/allComplain', (req, res) => {
  let sqlStr = 'SELECT * FROM complain';
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '数据库连接失败'});
    } else {
      res.json({
        success: 200,
        message: results
      });
    }
  })
})
// 单条查询
router.get('/api/oneComplain', (req, res) => {
  let id = req.query.id
  console.log(id)
  let sqlStr = `SELECT * FROM complain WHERE id = ${id}`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '数据库连接失败'});
    } else {
      res.json({
        success: 200,
        message: results
      });
    }
  })
})
// 上报领导
router.get('/api/comUser', (req, res) => {
  let id = req.query.id
  console.log(id)
  let sqlStr = "SELECT * FROM users WHERE post = '信访负责人'";
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '数据库连接失败'});
    } else {
      res.json({
        success: 200,
        message: results
      });
    }
  })
})
// 删除投诉
router.post('/api/delCom', (req, res) => {
  let id = req.body.id
  console.log(id)
  let sqlStr = `DELETE FROM complain WHERE id = ${id}`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({err_code: 0, message: '数据库连接失败'});
    } else {
      res.json({
        success: 200,
        message: "删除成功"
      });
    }
  })
})
// 头像上传
router.post('/api/upload', (req, res) => {
  let avatar = req.body.avatar;
  let id = req.body.id;
  const sqlStr = `UPDATE users SET avatar = '${avatar}' WHERE id = '${id}'`;
  conn.query(sqlStr, (error, results, fields) => {
    if(!error) {
      const userStr = `SELECT * FROM users WHERE id = '${id}'`
      conn.query(userStr, (error, results, fields) => {
        delete results.password
        res.json({
          success: 200,
          message: results
        });
      })
    } else {
      res.json({message: '修改头像失败'})
    }
  })
})
module.exports = router;