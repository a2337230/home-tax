<template>
  <div class="residence">
    <h1 class="title">{{title}}</h1>
    <el-steps
      :active="step.active"
      finish-status="success"
      align-center
    >
      <el-step :title="step.title1"></el-step>
      <el-step :title="step.title2"></el-step>
      <el-step :title="step.title3"></el-step>
    </el-steps>
    <!-- 房屋信息录入 -->
    <section class="house-info" v-if="step.active === 0">
      <div class="house-container">
        <el-form :model="userInfo" status-icon :rules="rules" ref="userInfo" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="transType === 4?'受赠方':'买方姓名'" prop="name" style="width: 200px;display: inline-block">
            <el-input type="text" v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="userid" style="width: 300px;display: inline-block">
            <el-input type="text" v-model="userInfo.userid"></el-input>
          </el-form-item>
          <el-form-item label="是否首套住宅" v-if="transType % 2 == 0 && transType !== 4" style="width: 322px;display: inline-block;margin-left:20px">
            <el-radio-group size="medium" v-model="userInfo.userHouse">
              <el-radio border label="首套"></el-radio>
              <el-radio border label="非首套"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 开发商信息 -->
          <div class="builder" v-if="transType <= 1">
            <el-form-item label="房地产商" prop="builder" style="width: 500px;display: inline-block">
              <el-input type="text" v-model="userInfo.builder"></el-input>
            </el-form-item>
            <el-form-item label="发票是否正规" style="width: 322px;display: inline-block;margin-left:20px">
              <el-radio-group size="medium" v-model="userInfo.builderInvoice">
                <el-radio border label="正规"></el-radio>
                <el-radio border label="非正规"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 卖方信息 -->
          <div class="seller" v-if="transType > 1">
            <el-form-item :label="transType === 4?'赠与方':'卖方姓名'" prop="sellername" style="width: 200px;display: inline-block">
              <el-input type="text" v-model="userInfo.sellername"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="selleruserid" style="width: 300px;display: inline-block">
              <el-input type="text" v-model="userInfo.selleruserid"></el-input>
            </el-form-item>
            <el-form-item v-if="transType === 2" label="是否满五年" style="width: 322px;display: inline-block;margin-left:20px">
              <el-radio-group size="medium" v-model="userInfo.invoice">
                <el-radio border label="是"></el-radio>
                <el-radio border label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="transType === 3 " label="征收方式" style="width: 322px;display: inline-block;margin-left:20px">
              <el-radio-group size="medium" v-model="userInfo.taxmodel">
                <el-radio border label="定额征收" style="margin: 0; padding-right: 10px"></el-radio>
                <el-radio border label="计算征收" style="margin-left: 18px; padding-right: 10px"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="家庭住址" prop="family">
            <el-input type="text" v-model="userInfo.family"></el-input>
          </el-form-item>
          <el-form-item label="房屋地址" prop="address">
            <el-input type="text" v-model="userInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积" prop="area" style="width: 190px;display: inline-block">
            <el-input type="number" @keyup.native="oninput" v-model="userInfo.area" placeholder="单位㎡"></el-input>
          </el-form-item>
          <el-form-item label="房屋价格" prop="price" style="width: 200px;display: inline-block">
            <el-input type="number" @keyup.native="oninput" @blur="verPrice" v-model="userInfo.price" placeholder="单位元"></el-input>
          </el-form-item>
          <el-form-item label="发票价格" v-if="userInfo.taxmodel === '计算征收' && transType === 3" prop="oriprice" style="width: 220px;display: inline-block; margin-left:20px">
            <el-input type="number" @keyup.native="oninput" v-model="userInfo.oriprice" placeholder="单位元"></el-input>
          </el-form-item>
          <el-form-item label="适用税率" prop="tax" style="width: 170px;display: inline-block;pointer-events:none">
            <el-input type="text" :value="comTax"></el-input>
          </el-form-item>
          <el-form-item v-if="transType !== 3" label="购买日期" prop="date" style="width: 170px;display: inline-block">
            <el-date-picker
              v-model="userInfo.date"
              type="date"
              :editable=false
              style="width:182px"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="房屋朝向">
            <el-radio-group v-model="userInfo.direction">
              <el-radio label="南北"></el-radio>
              <el-radio label="东西"></el-radio>
              <el-radio label="东"></el-radio>
              <el-radio label="西"></el-radio>
              <el-radio label="南"></el-radio>
              <el-radio label="北"></el-radio>
              <el-radio label="东南"></el-radio>
              <el-radio label="西南"></el-radio>
              <el-radio label="东北"></el-radio>
              <el-radio label="西北"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="user-info-btn">
            <el-button type="primary" @click="submitForm('userInfo')" class="btnsize">下一步</el-button>
          </div>
        </el-form>
      </div>
    </section>
    <!-- 税种明细 -->
    <section class="tax-info" v-if="step.active === 1">
      <div class="tax-container">
        <div class="dealname">
          <p class="purchaser"><span>买方 : </span>{{userInfo.name}}</p>
          <p class="seller"><span>{{transType>1?"卖方 : ":"房地产商 : "}}</span>{{transType>1?userInfo.sellername:userInfo.builder}}</p>
        </div>
        <p class="address"><span>房屋地址 : </span> {{userInfo.address}} </p>
        <el-table
          :data="tableData[0]"
          border
          style="width: 100%">
          <el-table-column
            prop="taxes"
            align="center"
            label="税种">
          </el-table-column>
          <el-table-column
            prop="rate"
            align="center"
            label="税率">
          </el-table-column>
          <el-table-column
            prop="taxPrice"
            align="center"
            label="税额">
          </el-table-column>
          <el-table-column
            prop="houseType"
            align="center"
            label="不动产类型">
          </el-table-column>
          <el-table-column
            v-if="transType % 2 === 0"
            prop="oneHouse"
            align="center"
            label="是否首套">
          </el-table-column>
        </el-table>
        <div class="alltax">
          <p class="tax-title">税款总额</p>
          <div class="tax-price">
            <p>买方税额 : {{allPrice.purchaser.toFixed(2)}} 元</p>
            <p v-if="transType>1">卖方税额 : {{allPrice.seller.toFixed(2)}} 元</p>
            <p>合计 : {{(allPrice.seller + allPrice.seller).toFixed(2)}} 元</p>
          </div>
        </div>
        <div class="user-info-btn">
          <el-button type="primary" @click="step.active = 0" class="btnsize">上一步</el-button>
          <el-button type="primary" @click="submitTaxInfo" class="btnsize">下一步</el-button>
        </div>
      </div>
    </section>
    <!-- 是否提交 -->
    <section class="submit-tax" v-if="step.active === 2">
      <div class="submit-container">
         <h2>房屋交易信息</h2>
        <el-table
          :data="dealInfo"
          border
          style="width: 100%">
          <el-table-column
            prop="purchaser"
            label="买方"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="seller"
            align="center"
            label="卖方">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="房屋地址">
          </el-table-column>
          <el-table-column
            prop="area"
            width="80"
            align="center"
            label="建筑面积">
          </el-table-column>
          <el-table-column
            prop="price"
            width="100"
            align="center"
            label="房屋价格">
          </el-table-column>
        </el-table>
        <h2>税费种信息</h2>
        <el-table
          :data="tableData[0]"
          border
          style="width: 100%">
          <el-table-column
            prop="taxes"
            align="center"
            label="税种">
          </el-table-column>
          <el-table-column
            prop="rate"
            align="center"
            label="税率">
          </el-table-column>
          <el-table-column
            prop="taxPrice"
            align="center"
            label="税额">
          </el-table-column>
          <el-table-column
            prop="houseType"
            align="center"
            label="不动产类型">
          </el-table-column>
          <el-table-column
            v-if="transType % 2 === 0"
            prop="oneHouse"
            align="center"
            label="是否首套">
          </el-table-column>
        </el-table>
        <div class="user-info-btn">
          <el-button type="primary" @click="step.active = 1" class="btnsize">上一步</el-button>
          <el-button type="primary" @click="datacommit" class="btnsize">提交</el-button>
        </div>
      </div>
    </section>
    <!-- 提交成功 -->
    <section class="end" v-if="step.active === 3">
      <div class="end-container">
        <img src="../../common/success.jpg" alt="上传成功" class="end-success">
        <div class="user-info-btn">
          <router-link to="/" tag="div">
            <el-button type="success" icon="el-icon-success" class="btnsize"> 返 回 首 页 </el-button>
          </router-link>
          <el-button type="success" @click="resetForm" icon="el-icon-success" class="btnsize"> 下 一 户 </el-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "residence",
  props: {
    title: String,
    transType: Number
  },
  data () {
    return {
      step: {
        active: 0,
        title1: "信息录入",
        title2: "税种核验",
        title3: "上传提交",
      },
      userInfo: {
        name: "", // 买方姓名
        userid: "", // 买方身份证
        sellername: "", // 卖方姓名
        selleruserid: "", // 卖方身份证
        builder: "", // 房地产商
        userHouse: "首套", // 买方名下几套住房
        invoice: "是", // 是否满五年
        builderInvoice: "正规", // 房地产商发票是否正规 
        date: "",  // 购买时间
        direction: "南北", // 房屋朝向
        family: "", // 家庭住址
        address: "", // 房屋地址
        area: null, // 房屋面积
        price: "", // 房屋价格
        tax: null, // 税率
        taxmodel: "计算征收",
        oriprice: ""
      },
      dealInfo: [], // 房屋信息表格数据
      tableData: [], // 税种表格数据
      taxdata: {
        // 1、契税 2、印花税（买） 3、贴花
        // 4、增值税 5、个人所得税 6、城建 7、教育 8、地方教育 9、土地增值税 10、印花税（卖）
        tax1: "",
        tax2: "",
        tax3: "",
        tax4: "",
        tax5: "",
        tax6: "",
        tax7: "",
        tax8: "",
        tax9: "",
        tax10: "",
      }, // 税费信息数据
      allPrice: {
        purchaser: 0,
        seller: 0
      }, // 税款总额
      rules: {
        // 买方名字
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
           {
            min:2,
            message:"请输入正确姓名",
            trigger:"blur"
          }
        ],
        // 卖方名字
        sellername: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
           {
            min:2,
            message:"请输入正确姓名",
            trigger:"blur"
          }
        ],
        // 开发商名字
        builder: [
          {
            required: true,
            message: "房地产开发商不能为空",
            trigger: "blur"
          },
           {
            min:8,
            message:"房地产开发商名称有误(最少为八个汉字)",
            trigger:"blur"
          },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,  //正则
            message: '只能为中文'
          }
        ],
        // 买方身份证
        userid: [
          {
            required: true,
            message: "身份证不能为空",
            trigger: "blur"
          },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "身份证输入有误",
            trigger: "blur"
          }
        ],
        // 卖方身份证
        selleruserid: [
          {
            required: true,
            message: "身份证不能为空",
            trigger: "blur"
          },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "身份证输入有误",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: '请输入正确地址',
            trigger: 'blur'
          }
        ],
        area: [
          {
            required: true,
            message: '请输入建筑面积',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入房屋价格',
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ],
        oriprice: [
          {
            required: true,
            message: '请输入原始发票金额',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  computed: {
    comTax () {
      let tax = 0;
      if (this.transType %2 === 0 && this.transType !== 4) {
        if (this.userInfo.userHouse == "首套") {
          if (this.userInfo.area <= 90) {
            tax = 1;
          } else if (this.userInfo.area > 90 && this.userInfo.area <= 144) {
            tax = 1.5;
          } else {
            tax = 3;
          }
        } else if (this.userInfo.userHouse == "非首套"){
          tax = 3;
        }
      } else if (this.transType === 4) {
        tax = 5;
      } else {
        tax = 5;
      }
      return tax + "%";
    }
  },
  methods: {
    houseForm () {

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 1、契税 2、印花税（买） 3、贴花
          // 4、增值税 5、个人所得税 6、城建 7、教育 8、地方教育 9、土地增值税 10、印花税（卖）
          // 初始化数据
          this.tableData = [];
          this.allPrice.purchaser = 0;
          this.allPrice.seller = 0;
          // 税种计算
          let tax = this.comTax;
          this.userInfo.tax = tax;
          let price = this.userInfo.price;
          let oriprice = this.userInfo.oriprice;
          let oneHouse = this.userInfo.userHouse;
          let busTax = price * 0.05; // 增值税
          let taxArr;
          this.taxdata.tax1 = (price * (parseFloat(tax) / 100)).toFixed(2);
          this.taxdata.tax3 = "5.00";
          if (this.transType === 0 || (this.transType === 2 && this.userInfo.invoice === "是")) {
            taxArr = [
              {
                type: 1,
                taxes: "契税",
                rate: tax,
                taxPrice:  this.taxdata.tax1,
                houseType: "住房",
                oneHouse
              },
              {
                type: 3,
                taxes: "贴花",
                rate: "按户征收",
                taxPrice:  this.taxdata.tax3,
                houseType: "住房",
                oneHouse
              }
            ]
            this.tableData.push(taxArr)
          } else if (this.transType === 1) {
            this.taxdata.tax2 = (price * 0.0005).toFixed(2);
            taxArr = [
              {
                type: 1,
                taxes: "契税",
                rate: tax,
                taxPrice:  this.taxdata.tax1,
                houseType: "非住房",
              },
              {
                type: 2,
                taxes: "印花税",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax2,
                houseType: "非住房",
              },
              {
                type: 3,
                taxes: "贴花",
                rate: "按户征收",
                taxPrice:  this.taxdata.tax3,
                houseType: "非住房",
              }
            ]
            this.tableData.push(taxArr)
          } else if ( this.transType === 2 && this.userInfo.invoice === "否") {
            this.taxdata.tax2 = (price * 0.0005).toFixed(2);
            this.taxdata.tax4 = busTax.toFixed(2);
            this.taxdata.tax5 = (price * 0.01).toFixed(2);
            this.taxdata.tax6 = (busTax * 0.07).toFixed(2);
            this.taxdata.tax7 = (busTax * 0.03).toFixed(2);
            this.taxdata.tax8 = (busTax * 0.02).toFixed(2);
            this.taxdata.tax10 = this.taxdata.tax2;
            taxArr = [
              {
                type: 1,
                taxes: "契税",
                rate: tax,
                taxPrice:  this.taxdata.tax1,
                houseType: "住房",
                oneHouse
              },
              {
                type: 2,
                taxes: "印花税",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax2,
                houseType: "住房",
                oneHouse
              },
              {
                type: 3,
                taxes: "贴花",
                rate: "按户征收",
                taxPrice:  this.taxdata.tax3,
                houseType: "住房",
                oneHouse
              },
              {
                type: 4,
                taxes: "营业税",
                rate: "5%",
                taxPrice:  this.taxdata.tax4,
                houseType: "住房",
                oneHouse
              },
              {
                type: 5,
                taxes: "个人所得税",
                rate: "1%",
                taxPrice:  this.taxdata.tax5,
                houseType: "住房",
                oneHouse
              },
              {
                type: 6,
                taxes: "城建维护建设税",
                rate: "7%",
                taxPrice:  this.taxdata.tax6,
                houseType: "住房",
                oneHouse
              },
              {
                type: 7,
                taxes: "教育附加费",
                rate: "3%",
                taxPrice:  this.taxdata.tax7,
                houseType: "住房",
                oneHouse
              },
              {
                type: 8,
                taxes: "地方教育附加费",
                rate: "2%",
                taxPrice:  this.taxdata.tax8,
                houseType: "住房",
                oneHouse
              },
              {
                type: 10,
                taxes: "产权转移书据",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax10,
                houseType: "住房",
                oneHouse
              }
            ]
            this.tableData.push(taxArr)
          } else if ( this.transType === 3) {
            console.log(1)
            this.taxdata.tax2 = (price * 0.0005).toFixed(2);
            this.taxdata.tax4 = busTax.toFixed(2);
            this.taxdata.tax5 = (price * 0.01).toFixed(2);
            this.taxdata.tax6 = (busTax * 0.07).toFixed(2);
            this.taxdata.tax7 = (busTax * 0.03).toFixed(2);
            this.taxdata.tax8 = (busTax * 0.02).toFixed(2);
            // this.taxdata.tax9 = tax9;
            this.taxdata.tax10 = this.taxdata.tax2;
            let tax9 = () => {
              // 差额
              let count = price - oriprice;
              console.log(count)
              if (this.userInfo.taxmodel === "定额征收") {
                this.taxdata.tax9 =  (price * 0.07).toFixed(2);
              } else {
                if (count < price * 0.2) {
                  this.taxdata.tax9 =  "0.00元"
                } else if (count >= price * 0.2 && count < price * 0.5) {
                  this.taxdata.tax9 =  (count * 0.3).toFixed(2);
                } else if (count >= price * 0.5 && count < price * 1) {
                  this.taxdata.tax9 =  ((count * 0.4) - (price * 0.05)).toFixed(2);
                } else if (count >= price * 1 && count < price * 2) {
                  this.taxdata.tax9 =  ((count * 0.5) - (price * 0.15)).toFixed(2);
                } else if (count >= price * 2) {
                  this.taxdata.tax9 = ((count * 0.6) - (price * 0.35)).toFixed(2);
                }
              }
            }
            tax9()
            taxArr = [
              {
                type: 1,
                taxes: "契税",
                rate: tax,
                taxPrice:  this.taxdata.tax1,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 2,
                taxes: "印花税",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax2,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 3,
                taxes: "贴花",
                rate: "按户征收",
                taxPrice:  this.taxdata.tax3,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 4,
                taxes: "营业税",
                rate: "5%",
                taxPrice:  this.taxdata.tax4,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 5,
                taxes: "个人所得税",
                rate: "1%",
                taxPrice:  this.taxdata.tax5,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 6,
                taxes: "城建维护建设税",
                rate: "7%",
                taxPrice:  this.taxdata.tax6,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 7,
                taxes: "教育附加费",
                rate: "3%",
                taxPrice:  this.taxdata.tax7,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 8,
                taxes: "地方教育附加费",
                rate: "2%",
                taxPrice:  this.taxdata.tax8,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 8,
                taxes: "土地增值税",
                rate: this.userInfo.taxmodel === "定额征收"?"7%":"计算征收",
                taxPrice:  this.taxdata.tax9,
                houseType: "非住房",
                oneHouse
              },
              {
                type: 10,
                taxes: "产权转移书据",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax10,
                houseType: "非住房",
                oneHouse
              }
            ]
            this.tableData.push(taxArr)
          } else {
            this.taxdata.tax2 = (price * 0.0005).toFixed(2);
            this.taxdata.tax10 = this.taxdata.tax2;
            taxArr = [
              {
                type: 1,
                taxes: "契税",
                rate: tax,
                taxPrice:  this.taxdata.tax1,
                houseType: "住房",
                oneHouse
              },
              {
                type: 2,
                taxes: "印花税",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax2,
                houseType: "住房",
                oneHouse
              },
              {
                type: 3,
                taxes: "贴花",
                rate: "按户征收",
                taxPrice:  this.taxdata.tax3,
                houseType: "住房",
                oneHouse
              },
              {
                type: 10,
                taxes: "产权转移书据",
                rate: "0.05%",
                taxPrice:  this.taxdata.tax10,
                houseType: "住房",
                oneHouse
              }
            ]
            this.tableData.push(taxArr)
          }
          // 计算买卖双方税额
          taxArr.forEach(item => {
            if (item.type <= 3) {
              this.allPrice.purchaser+=parseFloat(item.taxPrice);
            } else {
              this.allPrice.seller+=parseFloat(item.taxPrice);
            }
          })
          this.step.active = 1;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitTaxInfo () {
      this.dealInfo = [];
      let seller = "";
      if (this.transType < 2) {
        seller = this.userInfo.builder
      } else {
        seller = this.userInfo.sellername
      }
      let houseArr = {
        purchaser: this.userInfo.name,
        seller,
        address: this.userInfo.address,
        area: this.userInfo.area + "㎡",
        price: this.userInfo.price
      };
      this.dealInfo.push(houseArr)
      this.step.active = 2
    },
    datacommit () {
      let data = {
        transType: this.transType,
        houseInfo : this.userInfo,
        taxdata: this.taxdata,
        price: this.allPrice
      }
      this.$axios.post('http://www.tansuowu.com:3000/api/addHouse', data)
      .then(res => {
        console.log(res)
      })
      this.step.active = 3;
    },
    resetForm () {
      this.userInfo.name= ""; // 买方姓名
      this.userInfo.userid= ""; // 买方身份证
      this.userInfo.sellername= ""; // 卖方姓名
      this.userInfo.selleruserid= ""; // 卖方身份证
      this.userInfo.builder= ""; // 房地产商
      this.userInfo.userHouse= "首套"; // 买方名下几套住房
      this.userInfo.invoice= "是"; // 是否满五年
      this.userInfo.builderInvoice= "正规"; // 房地产商发票是否正规 
      this.userInfo.date= "";  // 购买时间
      this.userInfo.direction= "南北"; // 房屋朝向
      this.userInfo.family= ""; // 家庭住址
      this.userInfo.address= ""; // 房屋地址
      this.userInfo.area= null; // 房屋面积
      this.userInfo.price= ""; // 房屋价格
      this.userInfo.tax= null; // 税率
      this.step.active = 0;
      this.userInfo.taxmodel= "计算征收";
      this.userInfo.oriprice= "";
    },
    oninput() {
      if(!/^-?\d+\.?\d{0,2}$/.test(this.userInfo.price)){
        let nub =  this.userInfo.price
        nub =String(parseFloat(nub).toFixed(3));
        this.userInfo.price = nub.substring(0, nub.length-1)
      }
      
      if(!/^-?\d+\.?\d{0,2}$/.test(this.userInfo.area)){ 
        let nub =  this.userInfo.area
        nub =String(parseFloat(nub).toFixed(3));
        this.userInfo.area = nub.substring(0, nub.length-1)
      }
    },
    verPrice () {
      if (this.userInfo.price !== "") {
        if (this.transType % 2 === 0) {
          if (this.userInfo.price/this.userInfo.area < 3000) {
            this.$message({
              type: 'error',
              message: "您输入的价格不符合地区最低指导价"
            });
            this.userInfo.price = ""
          }
        } else {
          if (this.userInfo.price/this.userInfo.area < 5000) {
            this.$message({
              type: 'error',
              message: "您输入的价格不符合地区最低指导价"
            });
            this.userInfo.price = ""
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.residence {
  width: 100%;
  height: 100%;
  min-width: 950px;
  overflow: hidden;
  .title {
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
  }
}
.house-info {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .house-container {
    min-width: 800px;
    padding: 10px;
  }
}
.tax-info,.submit-tax,.end {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .tax-container,.submit-container,.end-container {
    min-width: 800px;
    color: #606266;
    .dealname {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      .seller,.purchaser {
        flex: 1;
      }
    }
    .address {
      line-height: 40px;
    }
    .end-success {
      display: block;
      margin: 10px auto;
      width: 400px;
    }
  }
}
.user-info-btn {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alltax {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
  .tax-price {
    // flex: 1;
    justify-content: right;
    display: flex;
    flex-direction: row;
    p {
      margin: 0 10px;
    }
  }
}
.submit-container h2{
  font-weight: normal;
  text-align: center;
  font-size: 18px;
  line-height: 50px;
}
.btnsize {
  width: 150px;
  text-align: center;
  margin: 0 30px;
}
</style>
