const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const passport = require("passport");
const index = require("./routes/api/index");
const cloudinary = require("cloudinary").v2;

/**socket io */
const socketIo = require("socket.io");
const SellerOrder = require("./models/SellerOrder");

/**node-scheduler */
const schedule = require("node-schedule");
const { checkAndUpdateOrderStatus } = require("./schedulerJobs/orders");

cloudinary.config({
  cloud_name: "hrishi7",
  api_key: "541159897319149",
  api_secret: "8w0_0un3DGPm5_auzEgbCssRg4w",
});

/**Midlewares declarations */
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, "public")));
//passport middleware
app.use(passport.initialize());
//passport Config
require("./config/passport.js")(passport);

//Mount base route
app.use("/api/v1/", index);

var j = schedule.scheduleJob("* * 2 * * *", function () {
  checkAndUpdateOrderStatus();
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

const io = socketIo(server);

app.set("socket", io);

io.on("connection", (socket) => {
  console.log("New client connected");
  pipeline = [
    {
      $match: { operationType: "insert" },
    },
  ];
  // Define change stream
  const changeStream = SellerOrder.watch(pipeline);
  // start listen to changes
  changeStream.on("change", function (event) {
    socket.emit("FromServer", event.fullDocument);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
