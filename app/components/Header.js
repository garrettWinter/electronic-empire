import { wrap } from "module";
import Link from "next/link";
import SigninButton from "./SigninButton";


import { useRouter } from 'next/navigation'
import SearchBar from "./product/SearchBar";
import { relative } from "path";

export default async function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: 'thistle',
    }}>
      <nav style={{
        display: 'flex',
        flexWrap: 'wrap',
        color: 'navy',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '60px',
        padding: '10px 5px',
      }}>
        <ul>
          <li style={{
            display: 'inline',
            padding: '5px',
            fontSize: 'large',
          }}><a href="/" >Home</a></li>
          <li style={{
            display: 'inline',
            padding: '5px',
            fontSize: 'large',
          }}><a href="/accounts">My Account</a></li>
          <li style={{
            display: 'inline',
            padding: '5px',
            fontSize: 'large',
          }}><a href="/cart">Shopping Cart</a></li>
          <li style={{
            display: 'inline',
            padding: '5px',
            fontSize: 'large',
          }}><a href="/products">Products</a></li>
          <li style={{
            display: 'inline',
            padding: '5px',
            fontSize: 'large',
          }}><a href="/contact" >Contact US</a></li>
        </ul>
        <SigninButton />
      </nav>
      <div > 
        <SearchBar />
      </div>

    </header >
  );
}
