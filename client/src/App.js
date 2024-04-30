import { useState, useContext } from "react";
import { AnimatePresence } from "framer-motion";

import SharedFileContainer from "./components/SharedFileContainer";
import Overlay from "./components/utils/Overlay";
import RetrieveForm from "./components/RetrieveForm";
import UploadForm from "./components/UploadForm";
import FriendsDropdown from "./components/FriendsDropdown";
import FriendsModal from "./components/FriendsModal";

import ContractContext from "./store/ContractContext";

import style from "./app.module.css";
import NotificationsDropdown from "./components/NotificationsDropdown";

function App() {
  const contract = useContext(ContractContext);
  console.log(contract);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAddFriendModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className={style.center}>
        <h1>BlockShare</h1>
        <p className={style.secondary__text}>A secure way to share files...</p>
        {contract.isConnected && (
          <p className={style.secondary__text}>
            Connected Account :{contract.account}
          </p>
        )}
      </div>
      <main className={style.main}>
        <UploadForm />
        <RetrieveForm />
        <SharedFileContainer />
      </main>
      <FriendsDropdown toggleFunction={toggleAddFriendModal}/>
      <NotificationsDropdown/>

      <AnimatePresence>
        {!contract.isConnected && (
          <Overlay className={style.overlay} onClick={contract.connectAccount}>
            <button className={style.button}> Please Connect to Account</button>
          </Overlay>
        )}
        {isModalOpen && (
          <FriendsModal
            toggleModal={toggleAddFriendModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
