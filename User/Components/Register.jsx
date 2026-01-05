import { useState } from "react";
import image from "../src/assets/google.png";
import image1 from "../src/assets/unnamed.png";
import image2 from "../src/assets/unnamed (1).png";
import { FiUser, FiMail, FiArrowRight } from "react-icons/fi";
import { ChartNoAxesCombined, Star, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();
  const [inp,setInp]=useState(false)

  const handle = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmpassword }),
    });
    const data = await response.json();
    console.log(data,"data")
    
    if(response.ok){
      console.log("Register successful!")
      localStorage.setItem('token',data.token)
      navigate("/Login")
    }else{
      console.log(data.error, "Registration failed" )
    }

    
  };

  const check = () => {
    navigate("/Login");
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="bg-gray-900 w-1/2 p-10 overflow-y-auto">
        <p className="text-white text-2xl font-bold mb-2 ml-10">
          Create your account
        </p>
        <p className="text-gray-400 mb-6 ml-10">
          Start your 14-day free trial. No credit card required.
        </p>

        <div className="ml-10">
          <button className="bg-black w-80 p-3 rounded-xl flex items-center justify-center gap-2">
            <img src={image} alt="Google" className="w-6" />
            <p className="text-white">Sign up with Google</p>
          </button>
          <p className="text-gray-400 text-center mt-2">Or sign up with email</p>
        </div>

        <form className="space-y-6 ml-10" onSubmit={handle}>
          <div className="relative">
            <label className="block text-white font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-80 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />
            <FiUser className="absolute left-72 top-11 text-gray-400" />
          </div>

          <div className="relative">
            <label className="block text-white font-medium mb-2">
              Work Email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />
            <FiMail className="absolute left-72 top-11 text-gray-400" />
          </div>

          <div className="relative">
            <label className="block text-white font-medium mb-2">
              Password
            </label>
            <input
              type={inp?"text":"password"}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />
            <button onClick={()=> setInp(!inp)} className="absolute left-72 top-11 text-gray-400">
              {inp?<EyeOff  />:<Eye/>}
            </button>
            
            

          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-80 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />
          </div>

          <div className="relative">
            <button
              type="submit"
              className="bg-blue-600 w-80 p-3 text-lg rounded-xl text-white font-bold hover:bg-blue-700 transition"
            >
              Create Account
            </button>
            <FiArrowRight className="absolute left-72 top-3 text-white" />
          </div>

          <div className="flex gap-1 ml-16">
            <p className="text-white">Already have an account?</p>
            <span className="text-blue-500 font-bold cursor-pointer" onClick={check}>
              Login
            </span>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-1/2 relative">
        <img src={image1} alt="Promotional" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-6 text-center">
          <ChartNoAxesCombined className="bg-blue-500 w-16 h-16 p-2 rounded-xl mb-4" />

          <div>
            <p className="text-white text-4xl font-bold">Track revenue.</p>
            <p className="text-white text-4xl font-bold">Close more deals.</p>
          </div>

          <div>
            <p className="text-white text-xl">
              Join over 10,000 sales professionals who use
              <br />
              SalesPro to organize leads, track pipelines, and
              <br />
              crush their quotas.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 w-96 space-y-4">
            <div className="flex gap-2 justify-center">
              <Star className="w-5 text-yellow-400" />
              <Star className="w-5 text-yellow-400" />
              <Star className="w-5 text-yellow-400" />
              <Star className="w-5 text-yellow-400" />
              <Star className="w-5 text-yellow-400" />
            </div>

            <div>
              <p className="text-slate-200 text-lg mb-4">
                "SalesPro transformed how our team operates. The
                <br />
                insights are incredible and the interface is blazing fast."
              </p>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <img src={image2} alt="" className="w-10 rounded-full" />
              <div>
                <p className="text-white font-semibold text-sm">Marcus Chen</p>
                <p className="text-slate-400 text-xs">VP of Sales, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
