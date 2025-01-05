import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";
import useQuestionStore from "../../store/zustand";
import { ChevronLeft } from "lucide-react";

export const Summary = () => {
  const { question: allQuestion } = useQuestionStore();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <AnimateProvider>
      <div className="mx-4 p-6">
        <h3 className="text-center text-neutral-800 font-bold text-2xl mb-6 pb-4">
          Questions Summary
        </h3>
        <div className="w-full max-w-3xl mx-auto h-[680px] overflow-y-auto rounded-lg">
          <div className="flex flex-col space-y-4 p-4">
            {allQuestion.map((question, i) => (
              <div
                key={i}
                className="w-full bg-white rounded-xl border border-gray-200 p-4"
              >
                <Question
                  singleQuestion={question}
                  id={i + 1}
                  summary={true}
                  trueAnswer={question.correct_answer}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col justify-center items-center relative w-full max-w-md mx-auto">
          <div className="flex items-center flex-col space-y-4 w-[60%] px-4 mx-auto mt-6">
            <button
              onClick={handleBack}
              className="w-[12rem] bg-[#075985] flex justify-center text-white py-4 text-lg font-bold rounded-full tracking-wider shadow-lg shadow-neutral-400"
            >
              <ChevronLeft size={"26px"} /> <span className="pl-2">Back</span>
            </button>
          </div>
        </div>
      </div>
    </AnimateProvider>
  );
};
