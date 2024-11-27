import express from "express";
import error from "./middlewares/error";
import notFound from "./middlewares/404";
import commissionRouter from "./router/commission";
import registerRouter from "./router/register";
import startRouter from "./router/start";
import userRouter from "./router/user";
import userId from "./middlewares/userId";
import reportRouter from "./router/report";

const app = express()

//  builtin middlewares
app.use(express.json())
app.use(userId)
// routes
app.use("/register", registerRouter)
// app.use("/start", startRouter)
// app.use("/commission", commissionRouter)
// app.use("/user" , userRouter)
// app.use("/report", reportRouter)


//  middlewares
////    not found
app.use(notFound)
////    on error
app.use(error)




export default app