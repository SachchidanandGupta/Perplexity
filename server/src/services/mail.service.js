import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:'OAuth2',
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
        accessToken:process.env.GOOGLE_ACCESS_TOKEN
    }
});

transporter.verify().then(()=>{
    console.log("Server is ready to send mails");
}).catch((err)=>{
    console.error("error connecting to mail server",err)
})

export async function sendEmail({to,subject,html,text}) {

    const mailOption = {
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    const details = await transporter.sendMail(mailOption);
    console.log("Email sent:",details);
}

export default transporter