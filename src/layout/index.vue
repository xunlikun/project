<style lang='scss' scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        width: 80%;
        min-width: 620px;
        margin-right: 20px;
        >.layout-nav-item{
            float: left;
        }
        >.layout-nav-item-right{
            float: right;
        }
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%',top:'0',zIndex:'1000'}">
                <Menu mode="horizontal" theme="dark" :active-name="currentMenuItemNum" @on-select='loading'>
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        
                        <MenuItem class='layout-nav-item' name="2" to='/manager/contract'>
                            <Icon type="ios-keypad"></Icon>
                            合同管理
                        </MenuItem>
                        <MenuItem class='layout-nav-item' name="3" to='/manager/employee'>
                            <Icon type="ios-analytics"></Icon>
                            人员管理
                        </MenuItem>
                        <MenuItem class='layout-nav-item' name="1" to='/manager/finance'>
                            <Icon type="ios-navigate"></Icon>
                            财务
                        </MenuItem>
                            <Dropdown @on-click="calculate" class='layout-nav-item-right' trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)" style="color:#fff;font-size:14px">
                                    ok
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="basic">基本信息</DropdownItem>
                                    <DropdownItem name='safe'>安全</DropdownItem>
                                    <DropdownItem name='logOut'>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '33px 20px 0', background: '#fff', minHeight: '600px',textAlign:'left'}">
                <router-view></router-view>
            </Content>
            <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
        </Layout>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import { mapGetters, mapMutations } from 'vuex'
    export default {
        data() {
            return {
                
            }
        },
        beforeRouteLeave(to,from,next){
            next(false)
        },
        computed: {
            ...mapGetters(['companyInfo','userInfo']),
            currentMenuItemNum:{
                get(){
                    let op = {
                        "Contract":'2',
                        "finance":'1',
                        "Employee":'3'
                    }
                    console.log(this.$route)
                    for (const key in op) {
                        if(this.$route.meta.title.includes(key)){
                            return op[key]
                        }
                    }
                    return '1'
                },
                set(value){
                    return value
                }
            }
        },
        methods: {
            ...mapMutations(['DELETE_TOKEN']),
            @track.loading
            loading(name){
                this.currentMenuItemNum = name
            },
            @track.loading
            calculate(name){
                switch (name) {
                    case 'logOut':
                        this.DELETE_TOKEN()
                        break;
                    case 'basic':
                        this.$router.push({name:'Basic'})
                        break;
                    case 'safe':
                        this.$router.push({name:'Safe'})
                        break;
                    default:
                        break;
                }
                
            }
        },
    }
</script>
