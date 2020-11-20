<template>
  <div id="userManage">
    <div class="organizationLeft">
      <el-autocomplete class="inline-input w100" v-model="OrganizationFactoryId" :fetch-suggestions="getOrganizationFactoryId" placeholder="请输入" :trigger-on-focus="false" @select="handleSelect" size='small'></el-autocomplete>
      <!-- </el-input> -->
      <div class="organizationTreeWrapper">
        <el-tree :data="treeData" node-key="id" ref='organizationTree2' :current-node-key="currentNodeKey" :default-expanded-keys='defaultExpanded' :props="defaultProps" :expand-on-click-node='onNode' @node-click='clickNode'>
        </el-tree>
      </div>
    </div>
    <div class="organizationRight">
      <div class="inputGroup">
        <div class="inputGroupLeft">
          <div>
            <p>组织机构：</p>
            <el-select v-model="value" placeholder="请选择" size="small" class="w100">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <p>单位类型：</p>
            <el-select v-model="value" placeholder="请选择" size="small" class="w100">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <p>姓名：</p>
            <el-input placeholder="请输入" v-model="input" size="small"></el-input>
          </div>
        </div>
        <div class="inputGroupRight">
          <el-button type="primary" size="small">
            <i class="el-icon-upload el-icon--right"></i>
            查询
          </el-button>
          <el-button size="small">
            <i class="el-icon-upload el-icon--right"></i>
            重置
          </el-button>
        </div>
      </div>

      <div class="TabBox">
        <div class="tabDataToatal">
          <span>共 {{tabDataToatal}} 条数据</span>
          <div class="btns">
            <div class="addBox">
              <i class="el-icon-plus"></i>
              <span>添加</span>
              <div class="addOptionsWrapper">
                <div @click="addFactory('unit')">
                  <i class="el-icon-arrow-right"></i>
                  <span>添加单位</span>
                </div>
                <div @click="addFactory('part')">
                  <i class="el-icon-arrow-right"></i>
                  <span>添加部门</span>
                </div>
              </div>
            </div>
            <div class="deleteBox" @click="deleteFactorys">
              <span>删除</span>
            </div>
            <div class="moreBox">
              <i class="el-icon-caret-bottom"></i>
              <span>更多</span>
              <div class="moreOptionsWrapper">
                <div>
                  <i class="el-icon-arrow-right"></i>
                  <span>批量启用</span>
                </div>
                <div>
                  <i class="el-icon-arrow-right"></i>
                  <span>批量停用</span>
                </div>
                <div>
                  <i class="el-icon-arrow-right"></i>
                  <span>导出</span>
                </div>
                <div>
                  <i class="el-icon-arrow-right"></i>
                  <span>批量添加</span>
                </div>
                <div>
                  <i class="el-icon-arrow-right"></i>
                  <span>批量维护</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tabWrapper">
          <div class="tabHeader">
            <div class="checked">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
            </div>
            <div class="name moveIconWrapper">
              <span class="text">单位名称</span>
              <span class="moveIconBox">
                <img src="../../../assets/images/top.png" alt="" class="cp">
                <img src="../../../assets/images/bottom.png" alt="" class="cp">
              </span>
            </div>
            <div class="abbreviation">
              <span class="text">代码简称</span>
            </div>
            <div class="division moveIconWrapper">
              <span class="text">行政区划</span>
              <span class="moveIconBox">
                <img src="../../../assets/images/top.png" alt="" class="cp">
                <img src="../../../assets/images/bottom.png" alt="" class="cp">
              </span>
            </div>
            <div class="address moveIconWrapper">
              <span class="text">详细地址</span>
              <span class="moveIconBox">
                <img src="../../../assets/images/top.png" alt="" class="cp">
                <img src="../../../assets/images/bottom.png" alt="" class="cp">
              </span>
            </div>
            <div class="superior moveIconWrapper">
              <span class="text">上级单位</span>
              <span class="moveIconBox">
                <img src="../../../assets/images/top.png" alt="" class="cp">
                <img src="../../../assets/images/bottom.png" alt="" class="cp">
              </span>
            </div>
            <div class="contact">
              <span class="text">联系人</span>
            </div>
            <div class="area">
              <span class="text">占地面积</span>
            </div>
            <div class="buildArea">
              <span class="text">建筑面积</span>
            </div>
            <div class="status moveIconWrapper">
              <span class="text">联网状态</span>
              <span class="moveIconBox">
                <img src="../../../assets/images/top.png" alt="" class="cp">
                <img src="../../../assets/images/bottom.png" alt="" class="cp">
              </span>
            </div>
            <div class="handle">
              <span class="text">操作</span>

            </div>
          </div>
          <div class="tabContainer">
            <div class="unitWrapper" v-for="(item,index) in tabData" :key="index">
              <div class="unitInfo fs16" :class="{fw600:item.checked===true}">
                <div class="checked">
                  <el-checkbox v-model="item.checked" @change="changeUnit"></el-checkbox>
                </div>
                <div class="name">
                  <span>{{item.name}}</span>
                  <span class="bottomIconBox">
                    <img src="../../../assets/images/bottom.png" alt="" class="cp" @click="clickUnit(item.id,-1)" v-if="item.showChild">
                    <img src="../../../assets/images/right.png" alt="" class="cp" @click="clickUnit(item.id,1)" v-else>
                  </span>
                </div>
                <div class="abbreviation">
                  <span>{{item.aliasName}}</span>
                </div>
                <div class="division">
                  <span>{{item.regionName}}</span>
                </div>
                <div class="address overflowClamp">
                  <span>{{item.detailedAddress}}</span>

                </div>
                <div class="superior overflowClamp">
                  <span>{{item.preFactoryName}}</span>

                </div>
                <div class="contact">
                  <span>{{item.contactUser1}}</span>

                </div>
                <div class="area">
                  <span>{{item.coversArea}}</span>

                </div>
                <div class="buildArea">
                  <span>{{item.constructionArea}}</span>

                </div>
                <div class="status">
                  <span>{{item.networkStatus}}</span>

                </div>
                <div class="handle">
                  <span class="cp" @click="lookFactory('look','unit',item)">查看</span>
                  <span class="cp" @click="lookFactory('edit','unit',item)">编辑</span>
                  <span class="cp moreSpan">更多
                    <div class="moreHandle">
                      <div @click="changeFactoryStatus('unit',item)">
                        <i class="el-icon-arrow-right"></i>
                        <span>{{item.enable==1?'停用':'启用'}}</span>
                      </div>
                      <div>
                        <i class="el-icon-arrow-right"></i>
                        <span @click="addFactory('part',item.id)">添加部门</span>
                      </div>
                      <div @click="deleteFactory(item.id,'factory')">
                        <i class="el-icon-arrow-right"></i>
                        <span>删除</span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <transition name="el-zoom-in-top">
                <div class="partWrapper transition-box" v-show="item.showChild">

                  <div class="partInfo" v-for="(i,ind) in item.children" :key="ind">
                    <div class="checked">
                    </div>
                    <div class="name">
                      <span>{{i.name}}</span>
                    </div>
                    <div class="abbreviation">
                      <span>{{i.aliasName}}</span>
                    </div>
                    <div class="division">
                      <span>{{i.regionName}}</span>
                    </div>
                    <div class="address overflowClamp">
                      <span>{{i.detailedAddress}}</span>

                    </div>
                    <div class="superior overflowClamp">
                      <span>{{item.name}}</span>

                    </div>
                    <div class="contact">
                      <span>{{i.contactUser1}}</span>

                    </div>
                    <div class="area">
                      <span>{{i.coversArea}}</span>

                    </div>
                    <div class="buildArea">
                      <span>{{i.constructionArea}}</span>

                    </div>
                    <div class="status">
                      <span>{{i.networkStatus}}</span>

                    </div>
                    <div class="handle">
                      <span class="cp" @click="lookFactory('look','part',i)">查看</span>
                      <span class="cp" @click="lookFactory('edit','part',i)">编辑</span>
                      <span class="cp moreSpan">更多
                        <div class="moreHandle">
                          <div @click="changeFactoryStatus('part',i)">
                            <i class="el-icon-arrow-right"></i>
                            <span>{{i.enable==1?'停用':'启用'}}</span>
                          </div>
                          <div @click="deleteFactory(i.id,'part')">
                            <i class="el-icon-arrow-right"></i>
                            <span>删除</span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>

                </div>
              </transition>
            </div>
          </div>
        </div>

      </div>
      <div class="paging">
        <div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2]" :page-size="pageSize" layout="prev, pager, next, sizes,jumper" :total="total" background>
          </el-pagination>
        </div>

      </div>
      <div class="formWrapper" v-show="showForm">
        <div class="title">
          <span>{{formTitle}}</span>
        </div>
        <div class="formContainer">
          <div class="addUnitForm" v-show="showUnitForm">
            <el-form :model="unitForm" :rules="Unitrules" ref="unitForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="单位名称：" prop="name">
                <el-input v-model="unitForm.name" @blur="getAliasName"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span='12'>
                  <el-form-item label="单位简称：" prop="aliasName">
                    <el-input v-model="unitForm.aliasName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="简称代码：" prop="aliasName2">
                    <el-input v-model="unitForm.aliasName2"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="上级单位：" prop="preFactoryId">
                <el-cascader ref="unitpreFactoryTree" :options="preFactoryIdOptions" :props="{ checkStrictly: true,value:'id',label:'name',emitPath:false }" clearable class="w100" @focus="getpreFactoryIdOptions('unit')" v-model='unitForm.preFactoryId'></el-cascader>
              </el-form-item>
              <el-form-item label="单位类型：" prop="factoryType">
                <el-select v-model="unitForm.factoryType" clearable placeholder="请选择" class="w100" @focus="getFactoryType">
                  <el-option v-for="item in factoryTypeOptions" :key="item.dictionaryId" :label="item.name" :value="item.dictionaryId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="行政区划：" prop="regionId">
                <el-row>
                  <el-col :span="8">
                    <el-select class="w80" v-model="regionId1" clearable placeholder="请选择" @focus="getProviceArr" @change="getCityArr(1)">
                      <el-option v-for="item in proviceArr" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select class="w80" v-model="regionId2" clearable placeholder="请选择" @change="getCountyArr(1)">
                      <el-option v-for="item in cityArr" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select class="w80" v-model="unitForm.regionId" clearable placeholder="请选择">
                      <el-option v-for="item in countyArr" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="详细地址：" prop="detailedAddress">
                <el-input v-model="unitForm.detailedAddress"></el-input>
              </el-form-item>
              <el-form-item label="联系人：" prop="contactUser1">
                <el-input v-model="unitForm.contactUser1"></el-input>
              </el-form-item>
              <el-form-item label="电话号码：" prop="contactPhone1">
                <el-input v-model="unitForm.contactPhone1"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span='12'>
                  <el-form-item label="占地面积：" prop="coversArea">
                    <el-input v-model="unitForm.coversArea">
                      <template slot="append">m²</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="建筑面积：" prop="constructionArea">
                    <el-input v-model="unitForm.constructionArea">
                      <template slot="append">m²</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="描述：" prop="describe">
                <el-input v-model="unitForm.describe" type="textarea" :autosize="{ minRows: 2}"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span='12'>
                  <el-form-item label="Logo：" prop="logoUrl">
                    <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                      <img v-if="logoUrl" :src="logoUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="二维码：" prop="d2Barcodes">
                    <!-- <el-input v-model="unitForm.d2Barcodes"></el-input> -->
                    <img src="unitForm.d2Barcodes" alt="">
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="addPartForm" v-show="showPartForm">
            <el-form :model="partForm" :rules="Partrules" ref="partForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="组织机构：" prop="preFactoryId">
                <el-cascader ref='partpreFactoryTree' :options="preFactoryIdOptions2" :props="{ checkStrictly: true,value:'id',label:'name',emitPath:false }" clearable class="w100" @focus="getpreFactoryIdOptions('part')" v-model='partForm.preFactoryId'></el-cascader>
              </el-form-item>
              <el-form-item label="部门名称：" prop="name">
                <el-input v-model="partForm.name"></el-input>
              </el-form-item>
              <el-form-item label="所在位置" prop="regionId">
                <el-row>
                  <el-col :span="8">
                    <el-select class="w80" v-model="regionId1" clearable placeholder="请选择" @focus="getProviceArr" @change="getCityArr(1)">
                      <el-option v-for="item in proviceArr" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select class="w80" v-model="regionId2" clearable placeholder="请选择" @change="getCountyArr(1)">
                      <el-option v-for="item in cityArr" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select class="w80" v-model="partForm.regionId" clearable placeholder="请选择">
                      <el-option v-for="item in countyArr" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="详细地址：" prop="detailedAddress">
                <el-input v-model="partForm.detailedAddress"></el-input>
              </el-form-item>
              <el-form-item label="联系人：" prop="contactUser1">
                <el-input v-model="partForm.contactUser1"></el-input>
              </el-form-item>
              <el-form-item label="电话号码：" prop="contactUser1Phone">
                <el-input v-model="partForm.contactUser1Phone"></el-input>
              </el-form-item>
              <el-form-item label="描述：" prop="describe">
                <el-input v-model="partForm.describe" type="textarea" :autosize="{ minRows: 2}"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="formFooter">
          <div class="btns">
            <el-button size="small" @click="resetForm">
              取消
            </el-button>
            <el-button type="primary" size="small" v-show="isEdit" @click="submitForm">
              保存
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showMask"></div>
  </div>
</template>

<script>
import {
  getOrganizationTreeData,
//   pageUnit,
//   partList,
//   getOrganizationTreeOptions,
//   searchAliasName,
//   getRegions,
//   addNewFactory,
//   addNewPart,
//   deleteOrganization,
//   updateUnit,
//   updatePart,
//   getUnit,
//   getPart,
//   organizationSort,
//   openUnit,
//   closeUnit,
//   openPart,
//   closePart
} from "@/apis/organization.js";
// import { listDictionary } from "@/apis/dictionary.js";
import { uploadIp, imgUrl } from "@/apis/upload.js";
import { handleSuccess, handleSure } from "@/utils/publicTools.js";
export default {
  data() {
    return {
      input: "",
      treeData: [],
      defaultProps: {
        id: "id",
        children: "children",
        label: "name"
      },
      onNode: false, //点击三角展开节点
      defaultExpanded: [], // 默认展开节点
      currentNodeKey: "",
      OrganizationTreeOptions: [], //输入组织机构数据
      OrganizationFactoryId: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tabDataToatal: 2, //数据总条数
      checkAll: false, //全选
      isIndeterminate: false, //半选中
      // show2: true, //部门动画过度
      // show1: true,
      // show3: false,
      tabData: [],
      // 分页
      currentPage: 1, //当前页
      total: 0, // 总条数
      pageSize: 2, //每页显示条数
      showForm: false, //表单
      showUnitForm: false,
      showPartForm: false,
      showMask: false,
      formTitle: "添加单位",
      unitForm: {
        name: "",
        aliasName: "",
        aliasName2: "",
        preFactoryId: "",
        factoryType: "",
        regionId: "",
        detailedAddress: "",
        contactUser1: "",
        contactPhone1: "",
        coversArea: "",
        constructionArea: "",
        describe: "",
        logoUrl: "",
        d2Barcodes: ""
      },
      preFactoryIdOptions: [], //上级单位
      preFactoryIdOptions2: [], //上级单位(部门)
      factoryTypeOptions: [], //单位类型
      regionId1: "", //省
      proviceArr: [],
      regionId2: "", //市
      cityArr: [],
      countyArr: [], //县
      partForm: {
        //添加部门
        name: "",
        regionId: "",
        detailedAddress: "",
        contactUser1: "",
        contactPhone1: "",
        describe: "",
        preFactoryId: ""
      },
      logoUrl: "", //LOGO地址
      uploadUrl: "", //上传地址
      deleteId: "",
      deleteType: "",
      isEdit: true //保存按钮显示
    };
  },
  created() {
    this.getOrganizationTree();
    // this.getUnit(this.currentPage);
  },
  mounted() {
    this.uploadUrl = uploadIp;
  },
  methods: {
       // 获取组织机构树形数据
    getOrganizationTree() {
      getOrganizationTreeData({
        organizationTreeEnum: "organizationTree"
      }).then(res => {
        if (res.httpStatus === 200) {
          // console.log(res)
          this.treeData = res.result.result;
          this.defaultExpanded.push(this.treeData[0].id);
        }
      });
    },
    clickNode(data, node, our) {
      //点击节点
      // console.log(data);
    },
    handleCheckAllChange() {
      // 全选,半选
      this.tabData.forEach(item => {
        item.checked = this.checkAll;
      });
    },
    //展开部门
    clickUnit(id, num) {
      // console.log(this.getparts(id))
      this.tabData = this.tabData.map(item => {
        if (item.id === id) {
          if (num === 1) {
            // console.log(1)
            this.getparts(id, item);
          } else {
            // console.log(-1)
            item.showChild = false;
          }
          // item.showChild = !item.showChild;
        }
        return item;
      });
    },
    changeUnit() {
      //选中单位
      let s1 = this.tabData.some(item => {
        //任意一项为true
        return item.checked;
      });
      let s2 = this.tabData.every(item => {
        //所有项为true
        return item.checked;
      });
      if (s1 && !s2) {
        this.isIndeterminate = true;
      } else if (!s1) {
        this.isIndeterminate = false;
        this.checkAll = false;
      } else {
        this.isIndeterminate = false;
        this.checkAll = true;
      }
    },
    // 单位分页
    getUnit(val) {
      val < 1 ? 1 : val;
      pageUnit({
        start: val,
        size: this.pageSize
      }).then(res => {
        // console.log(res);
        if (res.httpStatus === 200) {
          this.checkAll = false;
          this.total = res.result.countRows;
          this.tabData = res.result.result.map(item => {
            // item.
            item.checked = false;
            item.showChild = false;
            return item;
          });
        }
        // console.log(res);
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getUnit(val);
      console.log(`当前页: ${val}`);
    },
    //保存表单
    submitForm(formName) {
      // console.log(formName);
      if (this.showUnitForm) {
        formName = "unitForm";
      } else {
        formName = "partForm";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
           if (this.formTitle === "添加单位") {
        // if (this.unitForm.preFactoryId) {
        //   this.unitForm.preFactoryId = this.unitForm.preFactoryId[0];
        // }
        console.log(this.unitForm.preFactoryId);
        this.unitForm.preFactoryId =
          this.unitForm.preFactoryId === "0" ? "" : this.unitForm.preFactoryId;
        console.log(this.unitForm.preFactoryId);
        addNewFactory(this.unitForm).then(res => {
          if (res.httpStatus === 200) {
            this.getOrganizationTree();
            this.getUnit(this.currentPage);
            handleSuccess("您已成功添加该组织机构", "", "确定", "success");
          }
        });
      } else if (this.formTitle === "添加部门") {
        addNewPart(this.partForm).then(res => {
          if (res.httpStatus === 200) {
            this.getOrganizationTree();
            this.getUnit(this.currentPage);
            handleSuccess("您已成功添加该组织机构", "", "确定", "success");
          }
        });
      } else if (this.formTitle === "单位编辑") {
        let obj = {
          id: this.unitForm.id,
          name: this.unitForm.name,
          aliasName: this.unitForm.aliasName,
          aliasName2: this.unitForm.aliasName2,
          preFactoryId:
            this.unitForm.preFactoryId === "0"
              ? ""
              : this.unitForm.preFactoryId,
          factoryType: this.unitForm.factoryType,
          regionId: this.unitForm.regionId,
          detailedAddress: this.unitForm.detailedAddress,
          contactUser1: this.unitForm.contactUser1,
          contactPhone1: this.unitForm.contactPhone1,
          coversArea: this.unitForm.coversArea,
          constructionArea: this.unitForm.constructionArea,
          describe: this.unitForm.describe,
          logoUrl: this.unitForm.logoUrl,
          d2Barcodes: this.unitForm.d2Barcodes
        };
        updateUnit(obj).then(res => {
          if (res.httpStatus === 200) {
            handleSuccess("您已成功对组织机构进行修改", "", "确定", "success");
          }
        });
      } else {
        let obj = {
          id: this.partForm.id,
          name: this.partForm.name,
          regionId: this.partForm.regionId,
          detailedAddress: this.partForm.detailedAddress,
          contactUser1: this.partForm.contactUser1,
          contactPhone1: this.partForm.contactPhone1,
          describe: this.partForm.describe,
          preFactoryId: this.partForm.preFactoryId
        };
        updatePart(obj).then(res => {
          if (res.httpStatus === 200) {
            handleSuccess("您已成功对组织机构进行修改", "", "确定", "success");
          }
        });
      }
          // alert("submit!");
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
     
    },
    // 取消
    resetForm(formName) {
      if (this.showUnitForm) {
        formName = "unitForm";
      } else {
        formName = "partForm";
      }
      // this.$refs[formName].resetFields();
      //此行代码不能删（方法有坑）
      this[formName] = {};
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });

      this.showForm = false;
      this.showMask = false;
    },
    //增加
    addFactory(type, id = "") {
      this.clearForm();
      if (type === "unit") {
        //添加单位
        this.formTitle = "添加单位";
        this.showUnitForm = true;
        this.showPartForm = false;
      } else {
        this.$refs.partForm.resetFields();
        //添加部门
        if (id) {
          this.partForm.preFactoryId = id;
          this.getpreFactoryIdOptions("part");
        }
        this.formTitle = "添加部门";
        this.showUnitForm = false;
        this.showPartForm = true;
      }
      this.isEdit = true;
      this.showForm = true;
      this.showMask = true;
    },

   
    //更具单位主键查询一批部门并将部门放到单位下面
    getparts(preFactoryId, obj, num) {
      partList({
        preFactoryId
      }).then(res => {
        if (res.httpStatus === 200) {
          if (res.result.length > 0) {
            obj.children = res.result.map(item => {
              return item;
            });
            obj.showChild = true;
          } else {
            obj.showChild = false;
            this.$message({
              type: "info",
              message: "暂无数据"
            });
          }
        }
      });
    },
    //获取组织机构输入框数据
    async getOrganizationFactoryId(queryString, cb) {
      // console.log("搜索");
      let res1 = [];
      await getOrganizationTreeOptions({
        name: queryString,
        organizationTreeEnum: "organizationTree"
      }).then(res => {
        if (res.httpStatus === 200) {
          res1 = res.result.map(item => {
            return {
              value: item.name,
              address: item.id
            };
          });
          cb(res1);
        }
      });
      // console.log(res1);
      // return res1;
    },
    handleSelect(item) {
      // console.log(item.address);
      // this.currentNodeKey = item.address
      //高亮显示某一节点
      this.$refs.organizationTree2.setCurrentKey(item.address);
    },
    //获取单位简称
    getAliasName() {
      // console.log(111)
      searchAliasName({ name: this.unitForm.name }).then(res => {
        if (res.httpStatus === 200) {
          this.unitForm.aliasName = res.result;
        }
      });
    },
    // 获取上级单位
    getpreFactoryIdOptions(type) {
      if (type === "unit") {
        getOrganizationTreeData({
          organizationTreeEnum: "organizationTree"
        }).then(res => {
          if (res.httpStatus === 200) {
            console.log(res);
            this.preFactoryIdOptions = res.result.result;
            this.preFactoryIdOptions.unshift({
              name: "无",
              id: "0"
            });
          }
        });
      } else {
        getOrganizationTreeData({
          organizationTreeEnum: "organizationTree"
        }).then(res => {
          if (res.httpStatus === 200) {
            this.preFactoryIdOptions2 = res.result.result;
          }
        });
      }
    },
    // 查询单位类型
    getFactoryType() {
      listDictionary({
        index: "factory_type"
      }).then(res => {
        if (res.httpStatus === 200) {
          // console.log(res);
          this.factoryTypeOptions = res.result;
        }
      });
    },
    //获取省数组
    getProviceArr() {
      getRegions({
        level: 1
      }).then(res => {
        if (res.httpStatus === 200) {
          this.proviceArr = res.result;
        }
      });
    },
    //获取市数组
    getCityArr(num = "-1") {
      if (num == 1) {
        this.regionId2 = "";
        this.cityArr = [];
        this.unitForm.regionId = "";
        this.partForm.regionId = "";
        this.countyArr = [];
      }
      // if (!this.regionId1) {

      // return;
      // }
      getRegions({
        pid: this.regionId1,
        level: 2
      }).then(res => {
        if (res.httpStatus === 200) {
          this.cityArr = res.result;
        }
      });
    },
    //获取县、区数组
    getCountyArr(num = "-1") {
      if (num == 1) {
        this.unitForm.regionId = "";
        this.partForm.regionId = "";
        this.countyArr = [];
      }

      // if (!this.regionId2) {
      // return;
      // }
      getRegions({
        pid: this.regionId2,
        level: 3
      }).then(res => {
        if (res.httpStatus === 200) {
          this.countyArr = res.result;
        }
      });
    },
    //根据最后一级查出三级名字
    getThreeArea(reginonId, type) {
      getRegions({
        // pid: this.regionId2,
        id: reginonId,
        level: 3
      }).then(res => {
        if (res.httpStatus === 200) {
          if (res.httpStatus === 200) {
            this.regionId2 = res.result[0].pid;
            this.getCountyArr();
            getRegions({
              id: this.regionId2,
              level: 2
            }).then(res => {
              if (res.httpStatus === 200) {
                this.regionId1 = res.result[0].pid;
                this.getCityArr();
                this.getProviceArr();
              }
            });
          }
        }
      });
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isLt100M) {
        this.$message.error("上传头像图片大小不能超过 100MB!");
      }
      return isLt100M;
    },
    //成功上传
    handleAvatarSuccess(res, file) {
      this.$message({
        type: "success",
        message: "上传成功"
      });
      this.logoUrl = imgUrl + res.result;
      this.unitForm.logoUrl = this.logoUrl;
    },
    // 删除多个组织机构
    deleteFactorys() {},
    //删除组织机构（单个）
    deleteFactory(id, organizationEnum) {
      this.deleteId = id;
      this.deleteType = organizationEnum;
      handleSure(
        "您确定要删除以下组织机构吗？",
        "",
        "warning",
        this.sendDeleteFactory
      );
    },
    // 发送删除请求
    sendDeleteFactory(id, organizationEnum) {
      deleteOrganization({
        id: this.deleteId,
        organizationEnum: this.deleteType
      }).then(res => {
        if (res.httpStatus === 200) {
          this.$message({
            type: "success",
            message: "成功删除该组织机构"
          });
          if (this.tabData.length == 1) {
            this.currentPage -= 1;
          }
          this.getUnit(this.currentPage);
          this.getOrganizationTree();
        } else if (res.httpStatus === 417) {
          handleSure(
            "无法删除该组织机构,您可以在删除该组织机构下属的单位和部门后在进行删除",
            "",
            "danger"
          );
        }
      });
    },
    // 查看编辑
    lookFactory(confi, type, item) {
      // console.log(item);
      this.unitForm = {};
      this.regionId1 = "";
      this.regionId2 = "";
      this.countyArr = [];
      this.cityArr = [];
      //获取上级机构
      this.getpreFactoryIdOptions(type);
      //获取三级数据
      this.getThreeArea(item.regionId, type);
      //获取单位类型
      this.getFactoryType();
      if (confi === "look") {
        if (type === "unit") {
          this.formTitle = "单位详情";
        } else {
          this.formTitle = "部门详情";
        }
        this.isEdit = false;
      } else {
        if (type === "unit") {
          this.formTitle = "单位编辑";
        } else {
          this.formTitle = "部门编辑";
        }
        this.isEdit = true;
      }
      if (type === "unit") {
        this.unitForm = item;
        // console.log(this.unitForm)
        // this.unitForm.factoryType = item.factoryType;
        this.unitForm.preFactoryId !== "0" ? this.unitForm.preFactoryId : "0";
        // console.log(this.unitForm)
        this.showUnitForm = true;
        this.showPartForm = false;
      } else {
        this.partForm = item;
        this.showUnitForm = false;
        this.showPartForm = true;
      }
      this.showForm = true;
      this.showMask = true;
    },
    //清空表单相关
    clearForm(type) {
      if (type === "unit") {
        this.unitForm = {};
      } else {
        this.partForm = {};
      }
      this.regionId1 = "";
      this.regionId2 = "";
      this.cityArr = [];
      this.countyArr = [];
    },
    //启用/停用
    changeFactoryStatus(type, item) {
      console.log(type, item);
      if (type === "unit") {
        if (item.enable == 1) {
          closeUnit({ id: item.id }).then(res => {
            if (res.httpStatus === 200) {
              handleSuccess("您已成功停用该组织机构", "", "确定", "success");
              item.enable = -1
            }
          });
        } else {
          openUnit({ id: item.id }).then(res => {
            if (res.httpStatus === 200) {
              handleSuccess("您已成功启用该组织机构", "", "确定", "success");
              item.enable = 1
              
            }
          });
        }
      } else {
        if (item.enable == 1) {
          closePart({ id: item.id }).then(res => {
            if (res.httpStatus === 200) {
              handleSuccess("您已成功停用该组织机构", "", "确定", "success");
              item.enable = -1
              
            }
          });
        } else {
          openPart({ id: item.id }).then(res => {
            if (res.httpStatus === 200) {
              item.enable = 1
              
              handleSuccess("您已成功启用该组织机构", "", "确定", "success");
            }
          });
        }
      }
    },
   
  }
};
</script>

<style lang="less">
#userManage {
  width: 100%;
  height: 100%;
  display: flex;
  .organizationLeft {
    box-sizing: border-box;
    flex: 0 0 280px;
    padding: 8px;
    border-right: 1px solid #f2f2f2;
    & > .el-input {
      .el-input__inner {
        background-color: #f2f2f2;
      }
    }
    .organizationTreeWrapper {
      margin-top: 10px;
      .el-tree {
        color: #6d000e;
        .el-tree-node__content {
          position: relative;
          .iconBox {
            position: absolute;
            right: 0;
            top: 5px;
            display: none;
          }
        }
        .el-tree-node.is-current > .el-tree-node__content {
          background-color: #1890ff !important;
          color: #fff;
          .iconBox {
            display: block;
          }
        }
        .el-tree-node__content:hover {
          background-color: #1890ff;
          color: #fff;
        }
      }
    }
  }
  .organizationRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px 10px;
    position: relative;
    .inputGroup {
      flex: 0 0 74px;
      display: flex;
      justify-content: space-between;
      .inputGroupLeft {
        display: flex;
        & > div {
          width: 266px;
          margin: 0 10px;
          p {
            line-height: 30px;
          }
        }
      }
      .inputGroupRight {
        padding: 30px 10px 0 0;
        .el-button {
          width: 96px;
        }
      }
    }
    .TabBox {
      flex: 0 0 672px;
      border-top: 1px dashed #7f7f7f;
      border-bottom: 1px dashed #7f7f7f;
      overflow-y: auto;
      .tabDataToatal {
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        padding: 0 0 0 26px;
        .btns {
          display: flex;
          align-items: center;
          & > div {
            margin: 0 10px;
            width: 96px;
            height: 30px;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            span {
              margin-left: 5px;
            }
            .addOptionsWrapper,
            .moreOptionsWrapper {
              width: 100%;
              position: absolute;
              left: 0;
              top: 31px;
              background-color: #f2f2f2;
              border-radius: 5px;
              font-size: 14px;
              display: none;
              z-index: 20;
              & > div {
                height: 30px;
                line-height: 30px;
              }
              & > div:hover {
                color: #fff;
                background-color: #1890ff;
              }
            }
          }
          & > div:hover {
            background-color: #f2f2f2;
            & > .addOptionsWrapper,
            & > .moreOptionsWrapper {
              display: block;
            }
          }
          .addBox {
            border: 1px dashed #ccc;
          }
          .deleteBox {
            span {
              margin-left: 0;
            }
          }
        }
      }
      .tabWrapper {
        font-size: 16px;
        .bgcf2 {
          background-color: #f2f2f2;
        }
        .moveIconWrapper {
          display: flex;
          .moveIconBox {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 5px;
            img {
              width: 12px;
              height: 12px;
            }
          }
        }
        .tabHeader {
          display: flex;
          height: 48px;
          // line-height: 48px;
          background-color: #d7d7d7;
          font-size: 16px;
          & > div {
            display: flex;
            align-items: center;
          }
          .text {
            display: inline-block;
            height: 20px;
            padding-left: 8px;
            border-left: 2px solid #000;
            font-weight: 600;
          }
        }
        .tabContainer {
          font-size: 14px;
          .bottomIconBox {
            img {
              width: 12px;
              height: 12px;
            }
          }
          .unitWrapper {
            // display: flex;
            .unitInfo,
            .partInfo {
              display: flex;
              & > div {
                display: flex;
                align-items: center;
                line-height: 48px;

                span {
                  margin-left: 8px;
                }
              }
              // 超出显示省略号
              .overflowClamp {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
            }
            .checked {
              .el-checkbox {
                margin: 0 15px;
              }
            }

            .handle {
              color: #8a8afe;
              .moreSpan {
                display: inline-block;
                position: relative;
                .moreHandle {
                  width: 100px;
                  position: absolute;
                  right: 0;
                  top: 31px;
                  background-color: #f2f2f2;
                  border-radius: 5px;
                  font-size: 14px;
                  display: none;
                  z-index: 10;
                  & > div {
                    height: 30px;
                    line-height: 30px;
                  }
                  & > div:hover {
                    color: #fff;
                    background-color: #1890ff;
                  }
                }
              }
              .moreSpan:hover .moreHandle {
                display: block;
              }
            }
          }
          .unitWrapper:nth-child(2n) > .unitInfo {
            background-color: #f2f2f2;
          }
        }
        .checked {
          flex: 0 0 45px;
          justify-content: center;
          span {
            margin-left: 0 !important;
          }
        }
        .name {
          flex: 0 0 172px;
        }
        .abbreviation {
          flex: 0 0 99px;
        }
        .division {
          flex: 0 0 151px;
        }
        .address {
          flex: 0 0 151px;
        }
        .superior {
          flex: 0 0 148px;
        }
        .contact {
          flex: 0 0 133px;
        }
        .area {
          flex: 0 0 116px;
        }
        .buildArea {
          flex: 0 0 105px;
        }
        .status {
          flex: 0 0 100px;
        }
        .handle {
          flex: 1;
          min-width: 120px;
        }
      }
    }
    .paging {
      flex: 0 0 52px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .formWrapper {
      width: 700px;
      height: 770px;
      position: absolute;
      left: 50%;
      margin-left: -350px;
      bottom: 60px;
      z-index: 100;
      border: 1px solid #428bca;
      border-radius: 10px;
      // .addForm {
      //   width: 100%;
      //   height: 100%;
      // }
      background: #fff;
      box-shadow: -10px -10px 5px #888888;
      .title {
        height: 70px;
        line-height: 70px;
        background-color: #1890ff;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
      }
      .formContainer {
        height: 622px;
        overflow-y: auto;
        padding: 10px 85px;
        .addUnitForm {
          border-bottom: 1px dashed #404040;
        }
      }
      .formFooter {
        display: flex;
        justify-content: center;
        align-items: center;
        .btns {
          .el-button {
            width: 150px;
          }
          .el-button:last-child {
            margin-left: 74px;
          }
          .el-button:first-child {
            color: #000;
          }
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
  }
  .w100 {
    width: 100%;
  }
  .w80 {
    width: 80%;
  }
  .cp {
    cursor: pointer;
  }
  .fs16 {
    font-size: 16px;
  }
  .fw600 {
    font-weight: 600;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100x;
    display: block;
  }
}
</style>