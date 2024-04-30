import React, { useState, useContext, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import style from "./InputField.module.css";

import ContractContext from "../../store/ContractContext";

export default function InputField({
  onChangeHandler,
  value,
  placeholder,
  isAddressWrong,
  formDisable,
}) {
  const contract = useContext(ContractContext);

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getFriends = async () => {
    if (contract.isConnected) {
      setIsLoading(true);
      const friends = await contract.contract.getFriends();
      setFriends(friends);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, [isOpen]);

  return (
    <div className={style.main}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChangeHandler(e.target.value)}
        className={style.input}
        value={value}
        disabled={formDisable}
        style={{
          borderColor: !isAddressWrong ? "#eff8f9" : "red",
        }}
      />
      <div
        className={style.friendsDropdown}
        onClick={() => {
          if (!formDisable) setIsOpen((prev) => !prev);
        }}
      >
        <FaUserFriends />
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className={style.friendsList}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              layout
            >
              {friends.map((friend) => {
                return (
                  <li
                    onClick={() => {
                      onChangeHandler(friend.address_);
                    }}
                  >
                    {friend.name} {friend.address_}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
