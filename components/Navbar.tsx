import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { LogOut } from "./auth/LogOut";

const Navbar = async ({ sideMenu }) => {
  const session = await auth();
  return (
    <nav className="grid grid-cols-2 items-center mx-auto  mb-6 text-black">
      <div>
        <Link href="/">
          <Image
            src="/stayswift.svg"
            alt="Stay Swift Logo"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div>
        {sideMenu && (
          <ul className="flex gap-10">
            <li>
              <Link href="#">Recommended Places</Link>
            </li>

            <li>
              <Link href="#">About Us</Link>
            </li>

            <li>
              <Link href="#">Contact us</Link>
            </li>

            <li>
              <Link href="/bookings">Bookings</Link>
            </li>

            <li>
              {session?.user ? (
                <div>
                  <span className="mx-1"> {session?.user?.name} </span>
                  <span> | </span>
                  <LogOut />
                </div>
              ) : (
                <Link href="/login" className="login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
