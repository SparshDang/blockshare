import React, { useRef, useContext, useReducer } from "react";
import Overlay from "./utils/Overlay";
import ButtonsContainer from "./ButtonsContainer";
import Loader from "./utils/Loader";

import style from "./FriendsModal.module.css";

import ContractContext from "../store/ContractContext";

const addingFriendReducer = (state, action) => {
  if (action.type === "ADDING") {
    return {
      isAdding: true,
      status: null,
      error:null
    };
  } else if (action.type === "FAIL") {
    return {
      isAdding: false,
      status: "FAIL",
      error : action.error
    };
  } else if (action.type === "SUCCESS") {
    return {
      isAdding: false,
      status: "SUCCESS",
      error:null
    };
  } else if (action.type === "RESET") {
    return {
      isAdding: false,
      status: null,
      error:null
    };
  }
  return state;
};

export default function FriendsModal({ toggleModal }) {
  const [friendState, dispach] = useReducer(addingFriendReducer, {
    isAdding: false,
    status: null,
    error : null
  });
  const contract = useContext(ContractContext);
  const nameRef = useRef();
  const addressRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    dispach({ type: "ADDING" });
    try {
      const transaction = await contract.contract.addFriend(
        addressRef.current.value,
        nameRef.current.value
      );
      await transaction.wait();
      dispach({type:"SUCCESS"});
      setTimeout(
        () => {
          toggleModal();
        },2000
      )
    } catch (e) {
      dispach({type:"FAIL",error:e.reason});
    }
    setTimeout(
      () => {
        dispach({ type: "RESET" });
      },2000
    )
  };
  return (
    <Overlay>
      <div className={style.main}>
        <form onSubmit={onSubmit}>
          <h2>Add a friend</h2>
          <hr />
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" ref={nameRef} />
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" ref={addressRef} />
          <ButtonsContainer>
            <button type="button" onClick={toggleModal}>
              Cancel
            </button>
            <button type="submit">Add Friend</button>
          </ButtonsContainer>
        </form>
        {friendState.isAdding && <Loader />}
        {friendState.status === "SUCCESS" && (
          <Overlay>
            <p>Friend Added Successfully</p>
          </Overlay>
        )}
        {friendState.status === "FAIL" && (

          <Overlay>
            <p>Friend Not Added</p>
            <p className={style.secondary}>{friendState.error}</p>
          </Overlay>
        )}
      </div>
    </Overlay>
  );
}
