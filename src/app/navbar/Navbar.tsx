import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"
import { redirect } from "next/navigation";
import { getCart, CreateCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
//import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from "../@utils/authOptions";


async function searchProducts(formData: FormData){
    "use server";
    
    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery){
        redirect("/search?query=" + searchQuery);
    }
}
export default async function Navbar(){
    const cart = await getCart();
    const session = await getServerSession(authOptions);
    return(
        <div className="bg-base-100">
            <div className="navbar max-w-7x1 m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl normal-case">
                        <Image src={logo} height = {40} width={40} alt="Isaiah's Shop Logo"></Image>
                         Quick Ship
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input 
                            name="searchQuery" 
                            placeholder="Search" 
                            className="input input-bordered w-full min-w-[100px]">

                            </input>
                                
                            
                    </div>
                    </form>
                    <ShoppingCartButton cart={cart}/>
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
    );
}