import logoImg from "../assets/images/logo.svg";
// import checkImg from "../assets/images/check.svg";
// import answerImg from "../assets/images/answer.svg";
// import cx from "classnames";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useHistory, useParams } from "react-router-dom";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";
import emptyIMG from "../assets/images/EmptyState.svg";
import { useState } from "react";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [isAnsweredQuest, setIsAnsweredQuest] = useState(false);
  const [isHighlightedQuest, setIsHighlightedQuest] = useState(false);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}/`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestion(questionId: string) {
    if (isAnsweredQuest === false) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .update({ isAnswered: true });
      setIsAnsweredQuest(true);
    } else {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .update({ isAnswered: false });
      setIsAnsweredQuest(false);
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    if (isHighlightedQuest === false) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .update({ isHighlighted: true });
      setIsHighlightedQuest(true);
    } else {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .update({ isHighlighted: false });
      setIsHighlightedQuest(false);
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title} </h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questions.length === 0 ? (
          <div className="empty-content">
            <img src={emptyIMG} alt="empty" />
          </div>
        ) : (
          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <button
                    type="button"
                    onClick={() => handleCheckQuestion(question.id)}
                  >
                    <svg
                      className={question.isAnswered ? "checked" : ""}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.0003"
                        cy="11.9998"
                        r="9.00375"
                        stroke="#737380"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                        stroke="#737380"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <svg
                          className={question.isHighlighted ? "checked" : ""}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                            stroke="#737380"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover" />
                  </button>
                </Question>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
