import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdNotifications } from "react-icons/io";

import style from "./NotificationsDropdown.module.css";

import ContractContext from "../store/ContractContext";

export default function NotificationsDropdown({ toggleFunction }) {
  const contract = useContext(ContractContext);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggle = () => {
    if (!isOpen) {
      getNotificationsList();
    }
    setIsOpen((prev) => !prev);
  };

  const getNotificationsList = async () => {
    if (!contract.isConnected) return;
    const notifications = await contract.contract.getNotifications();
    setNotifications(notifications);
  };

  const deleteNotifications = async () => {
    try {
      await contract.contract.removeNotification();
    } catch (e) {}
    setNotifications([]);
  };

  return (
    <div className={style.main} onClick={toggle}>
      <IoMdNotifications />
      Notifications dropdown
      <AnimatePresence>
        {isOpen && contract.isConnected && (
          <motion.ul
            className={style.notifications_list}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            {notifications.map((notification, i) => (
              <li className={style.list_item} key={i}>
                <div className={style.info}>
                  <div>{notification}</div>
                </div>
              </li>

            ))}
            <li className={`${style.list_item} ${style.delete}`} onClick={deleteNotifications}>
                  <div>Delete Notifications</div>
              </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
