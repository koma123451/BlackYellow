import mongoose from "mongoose";
import bcrypt from "bcryptjs"
//声明用户登录模型
const userSchema = new mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}


},{timestamps:true});
//middleware - 在保存到数据库之前，如果密码有改动，就要用bcrypt加密
userSchema.pre("save",async function (next){
  //如果密码没改，直接下一个function，跳出这个函数（next()）
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10)
  next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model("User", userSchema);