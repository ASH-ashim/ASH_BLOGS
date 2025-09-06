import serverless from "serverless-http";
import app from "../server.js";

export const config = {
    api: { bodyParser: { sizeLimit: "10mb" } }
};

export default serverless(app);
