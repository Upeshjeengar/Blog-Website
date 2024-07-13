const {createProxyMiddleware}=require('http-proxy-middleware')

module.exports = function(root){
    root.use(
        '/api', //adjust the path you want to proxy
        createProxyMiddleware({
            target:'http://localhost:8000', //specify the address of your backend server
            changeOrigin:true,
            secure:false, //set to false if your backend doesn't uses HTTPS
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:3000' //adjust the react app's origin
            }
        })
    )
}