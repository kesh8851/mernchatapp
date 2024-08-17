const mongoose=require('mongoose');;
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://kesh8851:Bhadwa.1234@chutthi.va5cmxs.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
});
    console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(`Error :${error.message}`.red.bold);
        process.exit();

    }
};

module.exports=connectDB;