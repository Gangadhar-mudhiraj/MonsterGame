import { Heart } from "lucide-react";


export const UnlockedCard = ({ type, tag, description, imgSrc, bg, }) => {
    return (
            <div
                className={`question-container h-[25.375rem] rounded-3xl cursor-pointer`}
                style={{
                    backgroundColor: bg
                }}
            >
                <div className="p-5 pt-[1.563rem]">
                    <div className="question-tag-container flex justify-between">
                        <div className="question-type-tag h-[3.063rem] w-[7.25rem] text-white text-[1.25rem] rounded-full bg-black flex items-center justify-center">
                            {tag}
                        </div>
                        <div className="question-like h-[3.348rem] w-[3.348rem] bg-white rounded-full justify-center items-center flex">
                            <Heart className="text-red-600" />
                        </div>
                    </div>
                    <div className=" question-description-container px-3">
                        <h2 className="question-type text-[2.5rem] font-[500] leading-[3.125rem] mt-2">
                            {type}
                        </h2>
                        <p className="question-description font-[300] mt-2 text-[1.3rem] leading-[1.688rem] w-[15.938rem] h-[7.625rem] tracking-[5%] text-white">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="relative question-img-container ">
                    <img
                        src={imgSrc}
                        alt="list"
                        className="question-img h-[9.875rem] w-[16.875rem] -mt-14"
                    />
                </div>
            </div>
    );
};