import dotenv from "dotenv";
import http from "http";
// import fs from "fs";

dotenv.config();
import config from "./config/index";
import app from "./server";
// const options = {
//   key: fs.readFileSync(process.env.HTTPS_KEY_PATH as string, "utf8"),
//   cert: fs.readFileSync(process.env.HTTPS_CERT_PATH as string, "utf8"),
// };
export default http.createServer( app).listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
