import React from "react";
import { AgeParams } from "../utils/types";

interface Props {
  age: AgeParams | undefined;
}

const AgeMessage: React.FC<Props> = ({ age }) => {
  let message;

  if (age?.years === 0 && age?.months === 0 && age?.days === 0) {
    message = `You are born today`;
  } else {
    message = `You are ${age?.years} year(s), ${age?.months} month(s), and ${age?.days} day(s) old`;
  }

  return (
    <div className="message-wrapper">
      {age && <div className="age-text">{message}</div>}
    </div>
  );
};

export default AgeMessage;
