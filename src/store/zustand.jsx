import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuestionStore = create(
  persist(
    (set, get) => ({
      // Initial state
      question: [],
      userAnswer: [],
      error: null,
      totalTime: 0,
      trueAnswer: 0,
      falseAnswer: 0,
      auth: {},
      page: 1,
      transcriptChunks: [],
      currentChunkIndex: 0,
      videoId: null,
      isFetching: false,

      // Utility to update common state
      setError: (error) => set({ error }),
      setIsFetching: (status) => set({ isFetching: status }),
      setVideoId: (videoId) => {
        const { videoId: currentVideoId, resetQuestion } = get();
        if (currentVideoId !== videoId) {
          resetQuestion();
          set({ videoId });
        }
      },
      incrementIndex: () =>
        set((state) => {
          // console.log("Incrementing index from", state.currentChunkIndex);
          if (state.currentChunkIndex < state.transcriptChunks.length) {
            return { currentChunkIndex: state.currentChunkIndex + 1 };
          } else {
            console.warn("No more chunks to increment.");
            return state; // No change if it's at the end
          }
        }),

      // Fetch transcript
      fetchTranscript: async (videoId) => {
        try {
          const response = await fetch("https://backend.gameyoutube.com/transcript", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            }),
          });
          const { success, data } = await response.json();
          if (success && data?.chunks) {
            set({ transcriptChunks: data.chunks, currentChunkIndex: 0 });
          } else {
            throw new Error("Failed to fetch transcript");
          }
        } catch (error) {
          get().setError(error.message);
        }
      },

      // Fetch questions from a chunk
      fetchQuestionsFromChunk: async (
        videoId,
        chunkIndex,
        questionType = "mcqs"
      ) => {
        const { transcriptChunks, question, isFetching, setIsFetching } = get();

        if (isFetching) {
          console.warn("Already fetching questions; skipping this request.");
          return;
        }

        const chunk = transcriptChunks?.[chunkIndex];
        if (!chunk) {
          return get().setError("Chunk not available.");
        }

        if (question.some((q) => q.chunkIndex === chunkIndex)) {
          console.warn(
            `Questions for chunkIndex ${chunkIndex} already fetched.`
          );
          return; // Prevent duplicate fetch
        }

        setIsFetching(true);

        try {
          const response = await fetch(
            "https://backend.gameyoutube.com/getQuestions",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                videoId,
                query: chunk.query,
                questionType,
              }),
            }
          );
          const { data } = await response.json();
          if (data?.questions) {
            set((state) => ({
              question: [
                ...state.question,
                ...data.questions.map((q) => ({ ...q, chunkIndex })),
              ],
            }));
            get().incrementIndex(); // Increment index only if new questions are fetched
          } else {
            throw new Error("Failed to fetch questions");
          }
        } catch (error) {
          get().setError(error.message);
        } finally {
          setIsFetching(false);
        }
      },

      // Play more questions
      playMore: async (videoId) => {
        // console.log("paly more with ", videoId);
        const { currentChunkIndex, transcriptChunks, isFetching } = get();
        if (isFetching) {
          console.warn("Fetch in progress; skipping playMore.");
          return;
        }
        if (currentChunkIndex < transcriptChunks.length) {
          // console.log("play more getting quesiopns with ", videoId);
          await get().fetchQuestionsFromChunk(videoId, currentChunkIndex);
        } else {
          get().setError("No more chunks available to fetch questions.");
        }
      },

      // Other actions...
      authUser: (auth) => set({ auth }),
      addAnswer: (answer) =>
        set((state) => ({ userAnswer: [...state.userAnswer, answer] })),
      trueAction: () => set((state) => ({ trueAnswer: state.trueAnswer + 1 })),
      falseAction: () =>
        set((state) => ({ falseAnswer: state.falseAnswer + 1 })),
      logoutUser: () => {
        get().resetQuestion();
        set({
          auth: {},
          totalTime: 0,
          transcriptChunks: [],
          currentChunkIndex: 0,
          videoId: null,
        });
      },
      resetQuestion: () =>
        set({
          question: [],
          userAnswer: [],
          trueAnswer: 0,
          falseAnswer: 0,
          error: null,
          page: 1,
        }),
      resetGame: () => {
        get().resetQuestion();
        set({
          totalTime: 0,
          transcriptChunks: [],
          currentChunkIndex: 0,
          videoId: null,
        });
      },
      setTimeStamp: (time) => set({ totalTime: time }),
      nextPage: () =>
        set((state) => ({
          page: Math.min(state.page + 1, state.question.length),
        })),
    }),
    { name: "question-storage" }
  )
);

export default useQuestionStore;
