<template>
	<div class="body">

		<div class="login">
			<div class="left fl">
				<img :src="login_center_bg">
			</div>
			<div class="right fl">
				<div class="top clearfix">
					<h2>
						测试项目后台
					</h2>
				</div>
				<div class="inputs" id="name">
					<div class="username">
						<i class="icon iconfont icon-user">用户名</i>
						<input type="text" id="userName" v-model="loginForm.userName" @focus="focusName()" @blur="blur()">
					</div>
				</div>
				<div class="inputs" id="pass">
					<div class="username">
						<i class="icon iconfont icon-mima1">密&nbsp;&nbsp;&nbsp;码</i>
						<input type="password" id="userPass" v-model="loginForm.userPass" @focus="focusPass()" @blur="blur()">
					</div>
				</div>
				<div class="remember">
					<div class="tac">
						<div class="fl" id="rem-icon" @click="rem()">
							<span class="box icon iconfont icon-duihao"></span>
							<span>记住密码</span>
						</div>
						<div class="fr changePage" @click="changePage()">
							<span class="icon iconfont icon-qiehuan"></span>
							<span>系统切换</span>
						</div>
					</div>
				</div>
				<button class="btn" id="login" v-loading="loading" @click="LoginIn()">登&nbsp;&nbsp;&nbsp;录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import login_center_bg from '@/assets/images/houtai/login-left-bg-360x580.png'

	import '@/assets/fonts/aliIcon3/iconfont.css'
	
	import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
	
	import {login} from '@/api/login'

	export default {
		name: 'login',
		data() {
			return {
				loginForm: {
					userName: 'sunqian',
					userPass: '123321',
				},
				login_center_bg,
				loading:false
			}
		},
		methods:{
			LoginIn(){
				this.loading = true;
				this.$store.dispatch('Login', this.loginForm).then(() => {
					this.loading = false;
					// setCookie("username",this.loginForm.username,15);
					// setCookie("password",this.loginForm.password,15);
					this.$router.push({path: '/'})
				}).catch(() => {
					this.loading = false
				})
				
				// login(params).then(response=>{
				// 	if(response.data){
				// 		setCookie("user",JSON.stringify(response.data));
				// 		this.$router.push({path: '/'})
				// 	}
				// })
			},
			focusName(){
				$("#pass").removeClass("changebg");
				$("#name").addClass("changebg");
			},
			focusPass(){
				$("#name").removeClass("changebg");
				$("#pass").addClass("changebg");
			},
			blur(){
				$("#name").removeClass("changebg");
				$("#pass").removeClass("changebg");
			},
			rem(){
				$(".icon-duihao").toggleClass("icon-none");
			},
			changePage(){
				
			}
		}
	}
</script>

<style scoped>
	.body {
		background: url("../../assets/images/houtai/h-login-maxbg.png");
		background-size: contain;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.login {
		width: 1015px;
		height: 580px;
		background-color: #ffffff;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1001;
	}

	.login .left {
		width: 360px;
		height: 100%;
	}

	.left img {
		height: 100%;
	}

	.right {
		width: 655px;
		height: 100%;
	}

	.top {
		width: 100%;
		height: 48px;
		margin-top: 80px;
		text-align: center;
		line-height: 48px;
		margin-bottom: 45px;
	}

	.top img {
		width: 159px;
		height: 48px;
		vertical-align: sub;
		display: inline-block;
	}

	.top h2 {
		display: inline-block;
		color: #000;
		font-size: 36px;
		height: 48px;
		line-height: 48px;
	}

	.inputs {
		height: 102px;
		line-height: 102px;
		width: 100%;
		text-align: center;
	}

	.inputs .username {
		display: inline-block;
		width: 456px;
		height: 68px;
		box-shadow: 0 0 5px #999999;
		margin-top: 17px;
		line-height: 68px;
		padding-left: 30px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background-color: #ffffff;
	}

	.username i,
	.username span {
		color: #999999;
	}

	.username i {
		position: relative;
		font-size: 16px;
	}

	.username i:before {
		position: absolute;
		left: -35px;
		font-size: 30px;
		color: #d2d1d1;
	}

	.username input {
		width: 325px;
		height: 68px;
		padding: 3px 5px;
		float: right;
		font-size: 16px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.remember {
		color: #999999;
		width: 100%;
		height: auto;
		overflow: auto;
		margin-top: 15px;
		text-align: center;
	}

	.remember .tac {
		width: 456px;
		height: 30px;
		line-height: 30px;
		display: inline-block;
	}

	.remember .fl .box {
		width: 14px;
		height: 14px;
		background-color: #ffffff;
		border: 1px solid #999999;
		cursor: pointer;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.tac>div {
		cursor: pointer;
	}

	.icon-none:before {
		opacity: 0;
	}

	.remember span {
		font-size: 16px;
	}

	.btn {
		display: block;
		width: 456px;
		height: 70px;
		margin: 30px auto;
		background-color: #107ed3;
		font-size: 20px;
		color: #ffffff;
		cursor: pointer;
	}

	/*切换背景*/
	.changebg {
		background: url("../../assets/images/houtai/input-change-658x102.png") no-repeat;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}

	.wrapper {
		background: #50a3a2;
		background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
		background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 100%;
		margin-top: -200px;
		overflow: hidden;
	}

</style>
