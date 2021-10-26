import React from "react";
import styled from "styled-components";

type DeleteModalPropsType = {
  name: string;
  delete: () => void;
  close: () => void;
  loading: boolean;
};

export const DeleteModal = (props: DeleteModalPropsType) => {
  return (
    <DeleteModalContent>
      <h3>Are you sure to delete {props.name}</h3>
      <BtnsWrapper>
        <TrueBtn disabled={props.loading} onClick={props.delete}>
          Delete
        </TrueBtn>
        <FalseBtn disabled={props.loading} onClick={props.close}>
          Close
        </FalseBtn>
      </BtnsWrapper>
    </DeleteModalContent>
  );
};

const DeleteModalContent = styled.div`
  padding: 40px;
`;

const BtnsWrapper = styled.div`
  margin-top: 20px;

  button {
    padding: 20px 30px;
    border-radius: 15px;

    :disabled {
      background: gray;

      :hover {
        cursor: no-drop;
        border: 1px solid gray;
        color: #fff;
      }
    }
  }
`;

const TrueBtn = styled.button`
  background: #2a55f4;
  border: 1px solid #2a55f4;
  color: #fff;
  margin-right: 15px;

  :hover {
    background: none;
    cursor: pointer;
    color: #2a55f4;
  }
`;

const FalseBtn = styled.button`
  background: #979696;
  border: 1px solid #979696;
  color: #fff;

  :hover {
    background: none;
    cursor: pointer;
    color: #979696;
  }
`;
