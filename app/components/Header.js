import { wrap } from "module";
import Link from "next/link";
import SigninButton from "./SigninButton";


import { useRouter } from 'next/navigation'
import SearchBar from "./product/SearchBar";
import { relative } from "path";

export default async function Header() {
  return (
    <header>
      <nav style={{
        display: 'flex',
        flexWrap: 'wrap',
        color: 'navy',
        backgroundColor: 'thistle',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'fixed',
        width: '100%',
        height: '60px',
        border: '5px solid black',
        padding: '10px 5px',
        top: 0
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
      <div style={{paddingTop:'60px'}}> 
        <SearchBar />
      </div>

    </header >
  );
}
