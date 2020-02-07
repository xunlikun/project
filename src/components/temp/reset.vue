<template>
<div class="login_main">
    <div class='title'>
        <h1>系统标题</h1>
    </div>
    <div class='login'>
        <p>重置密码</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="password" >
                <Input type="text" v-model="formInline.password" placeholder="新密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="passwordAG" >
                <Input type="text" v-model="formInline.passwordAG" placeholder="重复输入">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align:right">
                <Button type="primary" @click="handleSubmit('formInline')">确定</Button>
            </FormItem>
        </Form>
    </div>
</div>
    
</template>
<script>
    import { resetUserInfo } from '@/api/user.js'
    export default {
        data () {
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                    this.checkOk = false
                } else if(value.length<6){
                    callback(new Error('密码长度不能小于6!'));
                    this.checkOk = false
                }
                  else {
                    callback();
                    this.checkOk = true
                }
            };
            const validatePassCheckAG = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                    this.checkOk = false
                } else if (value !== this.formInline.password) {
                    callback(new Error('密码不一致!'));
                    this.checkOk = false
                } else {
                    callback();
                    this.checkOk = true
                }
            };
            return {
                formInline: {
                    passwordAG: '',
                    password: ''
                },
                ruleInline: {
                    passwordAG: [
                        { validator: validatePassCheckAG, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        resetUserInfo({password:this.formInline.password}).then(res => {
                            if(res.status == 200){
                                this.$Message.success('密码修改成功!');
                                this.$router.replace({name:'Login'})
                            }
                        })
                    } else {
                        this.$Message.error('失败!');
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login{
        border-radius: 4px;
        background-color:#fff;
        padding: 10px 20px 30px 20px;
        width:400px;
        margin: 60px auto 0 auto;
        &:hover{
            box-shadow:0 0 10px 1px #eee;
        }
        >p{
            font-size:22px;
            line-height:100px;
            font-weight:700;
            color:#2d8cf0;
            opacity:.6;
        }
        >div.caculate{
            >ul{
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                >li{
                    
                }
            }
        }
    }
</style>