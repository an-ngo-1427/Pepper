import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/stocklogo.jpeg";
import "../../App.css";
import { CgProfile } from "react-icons/cg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { getUser, logOut } from "../../QueryHelpers/sessionQuery";
function Header({ user }) {
  const navigate = useNavigate()
  const clienQuery = useQueryClient()
  const {data} = useQuery({queryKey:['user'],queryFn:getUser})
  const userMutation = useMutation({
    queryKey:['user'],
    mutationFn:logOut,
    onSuccess:()=>clienQuery.invalidateQueries(['user'])
  })

  return (
    <header className="header">
      <img src={logo} alt="Pepper's Happy Trails Logo" className="logo" />
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            {data?.user ?
            (<Link to="/reservation">Reservation</Link>):
            (<Link to="/signup">Join Our Jails</Link>)
          }

          </li>
        </ul>
      </nav>

      {
        user ? (
          <Menu>
            <MenuButton _hover={{bg:'#aa9f88'}} as={Button} w='fit-content'>
              <CgProfile style={{fontSize:'20px',fontWeight:'bold'}}/>
            </MenuButton>
            <MenuList padding='10px'>
              <MenuItem><Link to='schedule' style={{color:'black'}}>Schedule</Link></MenuItem>
              <MenuItem><Link to='/companion' style={{color:'black'}}>Companions</Link></MenuItem>
              <MenuItem><Link to='/profile' style={{color:'black'}}>Profile</Link></MenuItem>
              <MenuItem><Link to='/reservation' style={{color:'black'}}>Schedule Appointments</Link></MenuItem>
              <MenuItem onClick={()=>{
                userMutation.mutate()
                }}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <button style={{ backgroundColor: '#aa9f88',padding:'5px' }}>
            <Link to="/login" style={{color:'black'}}>Login</Link>
          </button>
        )
      }

    </header>
  );
}

export default Header;
