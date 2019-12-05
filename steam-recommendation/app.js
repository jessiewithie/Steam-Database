var express       = require('express'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose');

    
mongoose.connect("mongodb://localhost/cis550",{useNewUrlParser:true});
var index = require('./routes/index');

var app = express();

//SCHEMA SETUP  (trial)
var steamuserSchema = new mongoose.Schema({
  name:String,
  password:String
});

var Steamuser = mongoose.model("Steamuser",steamuserSchema);

Steamuser.create(
  {
    name: "yangshu",
    password:"31415926"
  },function(err,Steamuser){
    if(err){
      console.log(err);
    }else{
      console.log("NEWLY CREATED");
      console.log(Steamuser);
    }
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);

});

app.listen('8081', function() {
  console.log('Server running on port 8081');
});

module.exports = app;
