import { Link } from "react-router-dom"
import { LayoutDashboard, CircleUserRound, SquareKanban, ShieldCheck, CircleCheck, Settings, Search, X, TrendingUp } from "lucide-react";

function Navbar() {
    return (

        <div className="flex bg-[#0b0e11] min-h-screen text-slate-300 font-sans fixed">
            <div className="w-64 border-r border-gray-800 flex flex-col p-4">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <span className="text-white font-bold text-xl">SalesCRM</span>
                </div>
                <div className="flex-1 space-y-2">

                    <Link to={"/"} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/10 text-white cursor-pointer">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>

                    <Link to={"/Contact"} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                        <CircleUserRound className="w-5 h-5" /> Contacts
                    </Link>

                    <Link to={"/Pipeline"} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                        <SquareKanban className="w-5 h-5" /> Pipeline
                    </Link>


                    <Link to={"/Revenue"} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                        <ShieldCheck className="w-5 h-5" /> Revenue
                    </Link>


                    <Link to={"/Tasks"} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                        <CircleCheck className="w-5 h-5" /> Tasks
                    </Link>

                </div>
                <div className="pt-4 border-t border-gray-800 space-y-4">

                    <Link to={"/Settings"} className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 cursor-pointer rounded-lg">
                        <Settings className="w-5 h-5" /> Settings
                    </Link>

                    <div className="flex items-center gap-3 p-2">
                        <div>
                            <p className="text-sm font-medium text-white leading-none">Alex Morgan</p>
                            <p className="text-xs text-gray-500 mt-1">Sales Lead</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar