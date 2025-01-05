import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import useQuestionStore from "../../store/zustand";
import List from "../../assets/list.png";
// import { Heart } from "lucide-react";
import { Carousel } from "../../components/Carousel";
// import { MCQCard } from "../../components/GameCards/MCQCard.jsx";
// import { FIBCard } from "../../components/GameCards/FIBCard.jsx";

import Monster from "../../assets/resultSucessMonster.png"
import { UnlockedCard } from "../../components/GameCards/UnlockedCard.jsx";
import { LockedCard } from "../../components/GameCards/LockedCard.jsx";
import Minner from "../../assets/miner.svg"
import boy from '../../assets/boy.png';

function Question() {
  const {
    setVideoId,
    fetchTranscript,
    playMore,
    question: questionData,
    resetGame,
  } = useQuestionStore();
  const navigate = useNavigate();
  // console.log("playmore", playMore);
  // console.log("Question store", useQuestionStore());
  // Get videoId from search params or fallback to a default value
  const searchParams = new URLSearchParams(window.location.search); // Ensure location is from `window`
  const videoId = searchParams.get("v") || "DHjqpvDnNGE"; // Fallback videoId  localStorage.removeItem("question-storage"); // Reset previous data
  // console.log("videoId", videoId);

  // Fetch the transcript only when questionData is empty and videoId is available
  useEffect(() => {
    // Handle redirect if no videoId
    if (!videoId) {
      alert("Oops! Something went wrong. Flying back to YouTube...");
      setTimeout(() => {
        window.location.href = "https://www.youtube.com"; // Redirect to YouTube
      }, 1000);
      return;
    }
    setVideoId(videoId); // Store in store
    const fetchData = async () => {
      if (!questionData.length && videoId) {
        // console.log("Fetching transcript...");
        await fetchTranscript(videoId);
        await playMore(videoId);
      }
    };
    fetchData();
  }, [videoId, questionData.length]);

  // If questionData is still empty after fetching, show a loading message
  if (!questionData.length)
    return (
      <div className="parent-container">
        <div className="loader"></div>
      </div>
    );

  return (
    // <AnimateProvider className="max-w-xl mx-auto">
    //   {videoId && (
    //     <div className="mb-5">
    //       <iframe
    //         width="100%"
    //         height="315"
    //         src={`https://www.youtube.com/embed/${videoId}`}
    //         title="YouTube video player"
    //         frameBorder="0"
    //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    //       ></iframe>
    //     </div>
    //   )}
    //   <h1 className="text-base md:text-lg font-semibold mb-5 text-orange-900">
    //     Quizz Info
    //   </h1>

    //   <div className="flex flex-col text-gray-900 space-y-3 text-xs md:text-sm">
    //     <div className="flex space-x-5">
    //       <p className="min-w-[170px]">Number of questions </p>
    //       <p className="font-bold">{questionData.length}</p>
    //     </div>

    //     <div className="flex space-x-5">
    //       <p className="min-w-[170px]">Category </p>
    //       <p className="font-bold text-orange-500">
    //         {questionData[0]?.topic || "General"}
    //       </p>
    //     </div>

    //     <div className="flex space-x-5">
    //       <p className="min-w-[170px]">Difficulty</p>
    //       <p className="font-bold capitalize text-lime-600">
    //         {questionData[0]?.difficulty || "Easy"}
    //       </p>
    //     </div>

    //     <div className="flex space-x-5">
    //       <p className="min-w-[170px]">Time </p>
    //       <p className="font-bold">3 mins.</p>
    //     </div>
    //   </div>

    //   <button
    //     disabled={!questionData.length}
    //     onClick={() => navigate(`/questions/play`)}
    //     className="flex w-full rounded-full bg-orange-500 cursor-pointer disabled:bg-orange-500/50 disabled:cursor-not-allowed p-1 justify-center font-semibold md:font-bold text-base md:text-lg text-center mt-10 text-white hover:bg-orange-500"
    //   >
    //     Start
    //   </button>
    // </AnimateProvider>

    //
    //      <AnimateProvider className="max-w-xl mx-auto flex justify-center items-center mt-10">
    // <div className={`h-[26.375rem] w-[21.875rem] bg-[#EB4C37] rounded-3xl `}>
    //   <div className="p-5 pt-[1.563rem]">
    //     <div className="flex justify-between ">
    //       <div className="h-[3.063rem] w-[7.25rem] text-white text-[1.25rem] rounded-full bg-black flex items-center justify-center">
    //         MCQ
    //       </div>
    //       <div className="h-[3.348rem] w-[3.348rem] bg-white rounded-full justify-center items-center flex">
    //         <Heart className="text-red-600" />
    //       </div>
    //     </div>
    //     <div className="px-3 ">
    //       <h2 className="text-[2.5rem] font-[500] leading-[3.125rem] mt-2">
    //         MCQ
    //       </h2>
    //       <p className="font-[300] mt-2 text-[1.3rem] leading-[1.688rem] w-[15.938rem] h-[7.625rem] tracking-[5%] text-white">
    //         Test your knowledge with engaging MCQs! Choose the correct answer
    //         from multiple options.
    //       </p>
    //     </div>
    //   </div>
    //   <div className="relative">
    //     <img
    //       src={List}
    //       alt="list"
    //       className="h-[9.875rem] w-[16.875rem] -mt-14"
    //     />
    //   </div>
    //      <button
    //     disabled={!questionData.length}
    //     onClick={() => navigate(`/questions/play`)}
    //     // className="flex w-full rounded-full bg-black text-white p-2  justify-center font-semibold md:font-bold text-base md:text-lg text-center mt-14 "
    //     className="h-[5rem] w-full rounded-[6.25rem] bg-black text-white text-[2rem] font-[600] mt-14"
    //   >
    //     Start Game
    //   </button>
    // </div>
    // </AnimateProvider>

    <>
      <AnimateProvider
        className={`question-page w-full flex lg:flex-row mt-3 justify-around  `}
      >
        <Carousel className="w-full md:w-auto order-none md:order-none">
          <Link to="/questions/play">
            <UnlockedCard
              bg="rgb(202, 132, 3)"
              type="MCQ"
              tag="MCQ"
              isActive={true}
              description={`Test your knowledge with engaging MCQs! Choose the correct answer from multiple options.`}
              imgSrc={List}
            />
          </Link>

          <Link to="/mine-your-answer/play/">
            <UnlockedCard
              bg="skyblue"
              type="CHOICE"
              tag="CHOICE"
              imgSrc={Minner}
              description={`Test your knowlede by playing the game! Choose the correction option from multiple options`}
            />
          </Link>

          <Link to={"/monstergame"} >
          <UnlockedCard
            bg="rgb(90 30 150)"
            type="MCQ"
            tag="MCQ"
            imgSrc={Monster}
            description={`Test your knowledge with engaging FIBs! Choose the correct answer from multiple options.`}
            />
          </Link>

          <Link to="/catch-the-apple/play">
            <UnlockedCard
              bg="rgb(5, 190, 5)"
              type="True False"
              tag="True False"
              isActive={true}
              description={`Test your knowledge with engaging questions! Choose the green apple if statement is true and vice versa.`}
              imgSrc={boy}
            />
          </Link>

          {/* <Link to="questions/play"> */}
          <LockedCard
            bg="rgb(70,121,102)"
            type="FIB"
            tag="FIB"
            imgSrc={List}
            description={`Test your knowledge with engaging FIBs! Choose the correct answer from multiple options.`}
          />
          {/* </Link> */}


        </Carousel>
        <div className="questions-details-container lg:max-w-[40%] md:max-w-[90%]  bg-white p-5 rounded order-1 md:order-none"> {/* md:w-[30%] */}
          <div className="yt-frame rounded overflow-hidden mb-4">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="question-details flex flex-col mt-4">
            <p className="questions-count">
              Number of questions: <b>{questionData.length}</b>
            </p>
            <p className="questions-level py-1">
              Difficulty level: <b>{questionData[0].difficulty || "Easy"}</b>
            </p>
            <p className="question-time-limit">
              Time Limit: <b>3 Min</b>
            </p>
          </div>
        </div>
      </AnimateProvider>
    </>
  );
}

export default Question;
