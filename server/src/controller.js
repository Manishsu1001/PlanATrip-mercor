const healthCheck = (req,res) => {
    console.log(process.env.SOME_KEY);
    return res.status(200).json({ status: true, message: 'Working fine' });
};





module.exports = {
    healthCheck
}