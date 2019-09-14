var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
// var server = app.listen(PORT, function() {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Example app listening at http://%s:%s", host, port);
// });
