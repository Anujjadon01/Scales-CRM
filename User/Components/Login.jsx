import { useState } from "react";
import image from "../src/assets/groth.jpg"
import image1 from "../src/assets/unnamed (1).png"
import image2 from "../src/assets/google.png"
import { FiMail } from "react-icons/fi";
import { EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("")
    const navigate=useNavigate()
    const [inp, setInp] = useState(false)
    const [password, setPassword] = useState("")

    const handle = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data2 = await response.json();
        if(response.ok){
            console.log("Login successful!")
            localStorage.setItem(data2.token)
            navigate("/Home")
        }else{
            console.log("faild")
        }

    }

    return <>
        <div className=" flex">
            <div className="bg-gray-900 w-215 ">
                <div className="ml-40 mt-20">

                    <div className="space-y-10">
                        <p className="text-white font-bold text-2xl  ">SalesForse One</p>
                        <div className="space-y-5">
                            <p className="text-white text-2xl font-bold">Welcome Back</p>
                            <p className="text-white">Enter your credentials to access your dashboard.</p>
                        </div>
                    </div>

                    <form className=" space-y-10 mt-15" onSubmit={handle}>

                        <div className="relative">
                            <label className="block text-white font-medium mb-2"> Email address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                            />
                            <FiMail className="absolute left-98 top-12 text-gray-400 text-[30px]" />
                        </div>

                        <div className="relative">
                            <label className="block text-white font-medium mb-2">Password</label>
                            <input
                                type={inp?"text":"password"}
                                placeholder="enter email"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                            />
                            <button onClick={()=> setInp(!inp)} className="absolute left-98 top-12 text-gray-400 text-[30px]">
                                 {inp?<EyeOff/>:<Eye/>}
                            </button>
                           

                        </div>
                        <div className="flex gap-47">
                            <span className="text-white text-lg">
                            Remember me</span>

                            <span className="font-semibold text-primary hover:text-blue-400 text-blue-500 text-lg">
                                Forgot Password?
                            </span>
                        </div>

                        <button type="submit" className="bg-blue-500 w-110 p-4 rounded-xl font-bold text-white text-[20px]">Sign in </button>

                        <div className="flex bg-blue-500 w-110 p-5 gap-5 rounded-xl bg-gray-800 border border-gray-600 text-white font-bold justify-center items-center">
                        <img src={image2} alt="image" className="w-5"/>
                            <button className=" "> Google </button>
                            
                            

                        </div>
                    </form>
                </div>
            </div>
            <div className="relative">
                <img src={image} alt="image" className="w-215 h-200" />
                <div className="absolute space-y-20  top-130 left-1/2 transform -translate-x-1/2 -translate-y-1/2  space-y-9    text-center  w-full  ">



                    <div className="">
                        <p className="text-white text-3xl font-bold">"SalesForce One transformed how our<br/> team tracks revenue. The interface is<br/> simply the fastest on the market.".</p>
                    </div>
                    <div className="    w-125 space-y-4 ml-37 ">

                       
                        <div className="ml-7 flex gap-2 ">
                            <img src={image1} alt="" className="w-10 rounded-3xl" />
                            <div className="">
                                <p className="text-white font-bold text-1xl">Marcus Chen</p>
                                <p className="text-slate-300 font-bold">VP of Sales, TechCorp</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    </>

}

export default Login;