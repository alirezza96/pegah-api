import express from "express";
import error from "./middlewares/error";
import notFound from "./middlewares/404";
import commissionRouter from "./router/commission";
import registerRouter from "./router/register";


const app = express()

//  builtin middlewares
app.use(express.json())

// routes
app.use("/register", registerRouter)
app.use("/commission", commissionRouter)


//  middlewares
////    not found
app.use(notFound)
////    on error
app.use(error)




export default app