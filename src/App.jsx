import { useEffect, useState } from "react";
import { data } from "./data.json";
import Question from "./Question";

export default function App() {
  const [pageNo, setPageNo] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [answers, setAnswers] = useState(Array(data.length).fill(null));
  // const [timer, setTimer] = useState(60 * 1000 * 10);
  const [timer, setTimer] = useState(60 * 1000);
  const [showResult, setShowResult] = useState(false);

  console.log(answers);

  useEffect(() => {
    setAnswers((prev) => {
      prev[pageNo - 1] = selectedAnswer ?? null;
      return [...prev];
    });
  }, [selectedAnswer]);

  useEffect(() => {
    setSelectedAnswer(answers[pageNo] || undefined);
  }, [pageNo]);

  useEffect(() => {
    // setTimeout(() => {}, 1000 * 60);

    let intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          if (pageNo === data.length) {
            clearInterval(intervalId);
            setShowResult(true);
          } else {
            setPageNo(pageNo + 1);
            return 60 * 1000;
          }
        }
        console.log(prev);
        return prev - 1000;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setTimer(60 * 1000);
    };
  }, [pageNo]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  if (showResult) {
    return (
      <main
        className={
          "bg-gray-900 h-screen w-full flex justify-center items-center flex-col gap-8 text-blue-50"
        }
      >
        Result Here
      </main>
    );
  } else {
    return (
      <main
        className={
          "bg-gray-900 h-screen w-full flex justify-center items-center flex-col gap-8 text-blue-50"
        }
      >
        <h1 className="text-4xl">Quiz Application</h1>
        <section className="w-3/5 h-3/5  relative p-8 container">
          <div className="flex justify-between">
            <p className="bg-yellow-500 px-1 py-1 w-fit">
              Question {pageNo} of {data.length}
            </p>
            <p className="bg-white text-black text-lg px-2 py-1 font-semibold">
              {millisToMinutesAndSeconds(timer)}
            </p>
          </div>

          <Question
            data={data}
            pageNo={pageNo}
            answers={answers}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />

          <div className="mt-8 mx-auto w-full flex gap-2 justify-center">
            <input
              type={"button"}
              className="px-2 py-1 border border-white cursor-pointer hover:shadow-white hover:shadow-md duration-150"
              value={"First"}
              onClick={(e) => setPageNo(1)}
            ></input>
            <input
              type={"button"}
              className="px-2 py-1 border border-white cursor-pointer hover:shadow-white hover:shadow-md duration-150"
              value={"Prev"}
              onClick={(e) => {
                setPageNo(pageNo !== 1 ? pageNo - 1 : pageNo);
              }}
            ></input>
            <input
              type={"button"}
              className="px-2 py-1 border border-white cursor-pointer hover:shadow-white hover:shadow-md duration-150"
              value={"Next"}
              onClick={(e) =>
                setPageNo(pageNo !== data.length ? pageNo + 1 : pageNo)
              }
            ></input>
            <input
              type={"button"}
              className="px-2 py-1 border border-white cursor-pointer hover:shadow-white hover:shadow-md duration-150"
              value={"Last"}
              onClick={(e) => setPageNo(data.length)}
            ></input>
          </div>
        </section>
        <footer className="mt-8">
          {data.map((item, i) => (
            <input
              className={`px-4 py-2 border hover:scale-105 hover:-translate-y-2 hover:shadow-md  hover:shadow-white cursor-pointer duration-200 ${
                pageNo - 1 === i ? "bg-white text-black" : ""
              }`}
              type={"button"}
              key={i}
              value={i + 1}
              // onClick={(e) => setPageNo(i + 1)}
              disabled
            ></input>
          ))}
        </footer>
      </main>
    );
  }
}
