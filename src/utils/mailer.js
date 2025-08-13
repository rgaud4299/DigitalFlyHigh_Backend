const nodemailer=require('nodemailer')





const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail Service Use करें
  secure: true, 
  auth: {
    
    user: 'rgaud4299@gmail.com',
    pass: 'klmerrvxdpqiulsd' 
  },
});

module.exports=transporter