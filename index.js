let express = require('express')
const path = require('path')
const multer = require('multer')
let docxtopdf = require("docx-pdf");

const bodyparser = require("body-parser");

const app = express()

app.use(express.static('uploads'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });
  
  var upload = multer({ storage: storage });
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.sendFile('./index.html');
});

app.post("/docxtopdf", upload.single("file"), (req, res) => {
    console.log(req.file.path)
    let outputfilepath = Date.now() + "output.pdf";
    docxtopdf(req.file.path, outputfilepath, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.download(outputfilepath,() => {
   
      })
    });
  });


app.listen(5000,() => {
    console.log("App is listening on port 5000")
})