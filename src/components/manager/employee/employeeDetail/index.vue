<template>
    <div v-if="data">
        <template v-if='$route.query.calculate == "search"'>
            <div class='main' :class='{main_bg:$route.query.calculate == "search"}'>
                <List>
                    <header>
                        <h1 style="line-height:50px;text-align:center;color:#2d8cf0;opacity:.6;">人员详情</h1>
                    </header>
                    <ListItem>
                        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="姓名" :description="data.name" />
                    </ListItem>
                    <ListItem>
                        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="身份证号码" :description="data.idNumber" />
                    </ListItem>
                    <ListItem>
                        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="职务" :description="data.position" />
                    </ListItem>
                    <ListItem>
                        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="手机号码" :description="data.mobile" />
                    </ListItem>
                </List>  
            </div>
        </template>
        <template v-else-if='$route.query.calculate == "editor"'>
            <Tabs size="small">
                <TabPane label="更新信息">
                    <div class='main'>
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
                            <FormItem style="text-align:right">
                                <!-- <router-link to="/companyInfo"> -->
                                <Button type="primary" @click="handleSubmit('formInline')">更新</Button>
                                <!-- </router-link> -->
                                
                            </FormItem>
                        </Form>
                    </div>
                </TabPane>
            </Tabs>
        </template>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import {getEmployeeDetail,saveEmployeeDetail} from '@/api/employee.js'
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
            data:'',
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
        }
    },
    created() {
        this.init()
    },
    methods: {
        @track.loading
        async init(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){
                    if(key == 'calculate') delete query[key]
                }else{
                    delete query[key]
                }
            }
            let data = (await getEmployeeDetail(query)).data
                this.data = data
        },
        @track.loading
        async saveEmployeeDetail(){
            let status = (await saveEmployeeDetail(this.data)).status
                        if(status == 200){
                           this.$Message.success('成功!'); 
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
<style lang="scss" scoped>
    .main{
        width: 500px;
        margin: 0 auto; 
    }
    .main_bg{
        box-shadow: 0 0 10px 1px #eee;
    }
</style>