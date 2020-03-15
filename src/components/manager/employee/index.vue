<template>
    <div>
        <Row :style='{paddingBottom:"20px"}'>
            <Col span="24" :style='{textAlign:"right"}'>
                <Button type="primary" @click='changeModal_employee_add'>
                    新增
                </Button>
            </Col>
        </Row>
        <Table :data="employeeData" :columns="tableColumns" stripe :style='{minHeight:"500px"}'></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal
            title="新增"
            v-model="modal_employee_add"
            class-name="vertical-center-modal"
            @on-ok="handleSubmit('formInline')"
            ok-text="新增">
            <Form ref="formInline" :model="data" :rules="ruleInline">
                    <FormItem prop="name" label="姓名">
                        <Input type="text" v-model="data.name" placeholder="姓名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="idNumber" label="身份证号">
                        <Input type="text" v-model="data.idNumber" placeholder="身份证号">
                            <Icon type="md-card" slot="prepend"/>
                        </Input>
                    </FormItem>
                    <FormItem prop="position" label="职务">
                        <Select v-model="data.position">
                            <Option value="projectManager">项目经理</Option>
                            <Option value="projectAccountant">项目财务</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="mobile" label="手机号码">
                        <Input type="tel" v-model="data.mobile" placeholder="手机号码">
                            <Icon type="ios-phone-portrait" slot="prepend"/>
                        </Input>
                    </FormItem>
                </Form>
        </Modal>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import { mapActions } from 'vuex'
import { saveEmployeeDetail,removeEmployee } from '@/api/employee.js'
export default {
    data() {
        const validateUserName = (rule, value, callback) => {
                if (value === '' || value === ' ') {
                    callback(new Error('请补充信息'));
                } else{
                    callback();
                }
                
            };
        return {
            op:{},
            total:100,
            current:1,
            employeeData:[],
            modal_employee_add:false,
            data:{
                name:'',
                idNumber:'',
                position:'',
                mobile:''
            },
            ruleInline: {
                    name: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    idNumber: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    position: [
                         { validator: validateUserName, trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validateUserName, trigger: 'blur' }
                    ]
                },
            tableColumns: [
                    {
                        title: '编号',
                        key: 'employeeCode',
                        render:(h,params) => {
                            return h('a',{on:{
                                click:() => {
                                    this.gotoDetail({id:params.row.id,calculate:'search'})
                                }
                            }},params.row.employeeCode ? params.row.employeeCode : '1')
                        },
                    },
                    {
                        title: '职务',
                        key: 'position'
                    },
                    {
                        title: '项目经理',
                        key: 'name'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile'
                    },
                    {
                        title: '身份证号',
                        key: 'idNumber'
                    },
                    {
                        title: '操作',
                        key: 'calculate',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.gotoDetail({id:params.row.id,calculate:'editor'})
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                            this.remove(params.row.id)

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
 
                    }
                ]
        }
    },
    created() {
        this.init()
    },
    methods: {
        ...mapActions(['getEmployeeList']),
        @track.loading
        remove(id){
            
            removeEmployee({id:id}).then(res =>{
                if(res.status == 200){
                    this.init()
                }
            })
        },
        @track.loading
        async init(){
            let query = JSON.parse(JSON.stringify(this.op))
            for (const key in query) {
                if(query[key]){

                }else{
                    delete query[key]
                }
            }

          let data = (await this.getEmployeeList(query)).data
          this.employeeData = data.records
          this.total = data.total
          this.current = data.page
        },
        @track.loading
        gotoDetail(query){
            this.$router.push({path:'/manager/employee/employeeDetail',query:query})
        },
        changePage (page) {
            this.op.current = page
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            this.init();
        },
        @track.loading
        changeModal_employee_add(){
            this.modal_employee_add = true
        },
        @track.loading
        async saveEmployeeDetail(){
            let status = (await saveEmployeeDetail(this.data)).status
                        if(status == 200){
                           this.$Message.success('成功!'); 
                           this.init()
                        }else{
                            this.$Message.error('服务器开小差去啦!');
                        }
        },
        async handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {

                        
                        await this.saveEmployeeDetail()
                        
                    } else {

                        this.$Message.error('请补充信息!');
                    }
                })
            }
    },
}
</script>
<style scoped>
    
</style>