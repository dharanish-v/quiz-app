import React from "react";

const Question = ({
  data,
  pageNo,
  selectedAnswer,
  setSelectedAnswer,
  answers,
}) => {
  return (
    <section
      className="border h-4/5 
     border-white px-8 py-8
     shadow-white shadow-md
      bg-gray-800 box-border"
    >
      <h2 className="text-2xl">{data?.[pageNo - 1].question}</h2>
      <div
        className="grid grid-cols-2 
      grid-rows-2 m-2 gap-16
       py-4 px-2 h-3/4"
      >
        {data?.[pageNo - 1].option.map((opt, i) => (
          <div
            className="border box-border h-24 whitespace-normal
             border-white px-4 py-2 flex items-center
              gap-4 cursor-pointer ease-out duration-200 
              hover:scale-105 hover:shadow-md hover:shadow-white"
            key={i}
            onClick={(e) => {
              setSelectedAnswer(selectedAnswer === i ? undefined : i);
            }}
          >
            <input
              type={"checkbox"}
              onClick={(e) => e.preventDefault()}
              className={
                "h-4 flex-grow-0 flex-shrink-0 w-4 pointer-events-none"
              }
              value={opt}
              readOnly
              checked={selectedAnswer === i || answers[pageNo - 1] === i}
            />
            <label className="pointer-events-none select-none break-all">
              {opt}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Question;
