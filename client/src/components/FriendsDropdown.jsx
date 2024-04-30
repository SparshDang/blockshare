import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserFriends } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import style from "./FriendsDropdown.module.css";

import ContractContext from "../store/ContractContext";

export default function FriendsDropdown({ toggleFunction }) {
  const contract = useContext(ContractContext);
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  const toggle = () => {
    if (!isOpen) {
      getFriendsList();
    }
    setIsOpen((prev) => !prev);
  };

  const getFriendsList = async () => {
    if (!contract.isConnected) return;
    const friends = await contract.contract.getFriends();
    setFriends(friends);
  };

  const deleteFriend = async (address) => {
    try {
      await contract.contract.deleteFriend(address);
    } catch (e) {}
    getFriendsList();
  };

  return (
    <div className={style.main} onClick={toggle}>
      <FaUserFriends />
      friends dropdown
      <AnimatePresence>
        {isOpen && contract.isConnected && (
          <motion.ul
            className={style.friends_list}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            {friends.map((friend,i) => (
              <li className={style.list_item} key={i}>
                <div className={style.info}>
                  <div>{friend[0]}</div>
                  <div className={style.secondary}>{friend[1]}</div>
                </div>
                <div
                  className={style.delete}
                  onClick={() => deleteFriend(friend.address_)}
                >
                  <MdDeleteOutline />
                </div>
              </li>
            ))}
            <li
              className={`${style.list_item} ${style.add_friend}`}
              onClick={toggleFunction}
            >
              Add Friend
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
