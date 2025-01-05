// import useQuestionStore from "../../store/zustand";
// import { useNavigate, useParams } from "react-router-dom";
// import TimeStamp from "../../components/TimeStamp/TimeStamp";
// import { useEffect } from "react";
// import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
// import Question from "../../components/Questions/Questions";

// function SingleQuestion() {
//   const navigate = useNavigate();
//   const {
//     question: allQuestion,
//     trueAction,
//     falseAction,
//     addAnswer,
//     page,
//     nextPage,
//     videoId,
//   } = useQuestionStore();

//   const { id } = useParams();

//   useEffect(() => {
//     if (Number(id) < page) {
//       navigate(`/question/${page}`);
//     }
//   }, [id, page, navigate]);

//   const singleQuestion = allQuestion?.[page - 1];

//   if (!singleQuestion) {
//     setTimeout(() => {
//       window.location.href = `https://www.youtube.com/watch?v=${videoId}`; // Redirect to YouTube after 1 second
//     }, 1000);
//     return <p>Oops!, No Questions Found...</p>;
//   }

//   const { correctOptionsIndex, options, question } = singleQuestion;

//   const handleClick = (selectedOption) => {
//     // Add answer
//     addAnswer({ question, answer: selectedOption });
//     // Verify Answer
//     if (selectedOption === options[correctOptionsIndex]) {
//       trueAction();
//     } else {
//       falseAction();
//     }
//     setTimeout(() => {
//       nextPage();
//       navigate(
//         page === allQuestion.length ? "/finish" : `/question/${Number(id) + 1}`
//       );
//     }, 700);
//   };

//   return (
//     <AnimateProvider className="max-w-xl mx-auto">
//       <div className="flex max-w-fit flex-col ml-auto space-x-3 mb-10">
//         <TimeStamp />
//       </div>

//       <Question
//         id={page}
//         handleClick={handleClick}
//         singleQuestion={singleQuestion}
//       />
//     </AnimateProvider>
//   );
// }

// export default SingleQuestion;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useQuestionStore from "../../store/zustand";
import TimeStamp from "../../components/TimeStamp/TimeStamp";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function SingleQuestion() {
  const {
    question: allQuestions,
    trueAction,
    falseAction,
    addAnswer,
    page,
    nextPage,
    videoId,
  } = useQuestionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(page - 1);
  const singleQuestion = allQuestions[currentQuestionIndex];

  useEffect(() => {
    // After finishing, redirect to /finish, no direct question access
    if (page > allQuestions.length) {
      navigate("/finish", { replace: true });
    }
  }, [page, allQuestions.length, navigate]);

  useEffect(() => {
    // Sync current index with global page state
    setCurrentQuestionIndex(page - 1);
  }, [page]);

  const handleAnswerClick = (selectedOption) => {
    const { correctOptionsIndex, options, question } = singleQuestion;

    // Record the user's answer
    addAnswer({ question, answer: selectedOption });

    // Check if the answer is correct
    if (selectedOption === options[correctOptionsIndex]) {
      trueAction();
    } else {
      falseAction();
    }

    // Proceed to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        nextPage(); // Update the global `page` in the store
      } else {
        navigate("/finish");
      }
    }, 700);
  };

  // Handle invalid questions
  if (!singleQuestion) {
    setTimeout(() => {
      navigate("/finish", { replace: true }); // Redirect to finish page if no questions are available
    }, 700);
    return <p>Oops! No more questions available.</p>;
  }

  return (
    <div className="bg-[#eee7de] h-screen p-0 m-0">

    <AnimateProvider className="max-w-xl mx-auto "> 
      
      <Question
        id={currentQuestionIndex + 1}
        handleClick={handleAnswerClick}
        singleQuestion={singleQuestion}
      />
      {/* 
      <div className="flex justify-between mt-5">
        <button
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
          disabled={currentQuestionIndex === 0}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentQuestionIndex((prev) =>
              Math.min(prev + 1, allQuestions.length - 1)
            )
          }
          disabled={currentQuestionIndex >= allQuestions.length - 1}
          className="p-2 bg-orange-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div> */}
      
    </AnimateProvider>
    </div>
  );
}

export default SingleQuestion;
