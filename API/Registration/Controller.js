const registerUser= (req,res)=>{
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const userEmail= req.body.email;
    const userPassword= req.body.psw;

    res.json({
        success: true,
        firstName,
        lastName,
        userEmail,
        userPassword
    })
}

module.exports= registerUser;
