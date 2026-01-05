import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import userModel from "./UserScheema.js";
import taskModel from "./taskSchema.js";
import connectDb from "./db.js";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken"
import router from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use("/api/user", router);


connectDb();
configDotenv()

app.post("/register", async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    try {
        let user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "user already exists" })
        }

        const hashPass = await bcrypt.hash(password, 10);
        user = await userModel.create({ username, email, password: hashPass, confirmpassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        // console.log(token,"fhurgur")

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }
        const checkpass = await bcrypt.compare(password, user.password)



        if (!checkpass) {
            return res.status(400).json({ error: "password is wrong" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

        res.status(201).json({
            message: "Login successfully",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/task", async (req, res) => {
    const { taskDis, duedate, priority, company } = req.body;

    try {
        await taskModel.create({ taskDis, duedate, priority, company })

        res.status(201).json({
            message: "Task Added successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get("/fetchTask", async (req, res) => {
    try {
        const fulldata = await taskModel.find();
        res.json({ fulldata });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put("/changeput/:id", async (req, res) => {
    const { id } = req.params
    const { taskDis, duedate, priority, company } = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(id, { taskDis, duedate, priority, company }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(201).json({
            message: "Task Change successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
