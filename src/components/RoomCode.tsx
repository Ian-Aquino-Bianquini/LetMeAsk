import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function CopyRoomToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={CopyRoomToClipboard}>
      <div>
        <img src={copyImg} alt="Copy" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
