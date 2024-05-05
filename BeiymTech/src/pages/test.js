import Image from "next/image";
import back from "../../public/images/back.png";
import "../app/globals.css";
import Link from 'next/link'
import { useState, useEffect } from "react";
import Question from "@/components/Question";
import axios from "axios";
import Navigation from "@/components/Navigation";

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    "http://3.71.166.30:8000/api/v1/questions/"
                );
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSelect = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        });

        // Move to the next question after selecting an answer
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Show result after answering all questions
            setShowResult(true);
        }
    };

    const resetTest = () => {
        setCurrentIndex(0);
        setSelectedAnswers({});
        setShowResult(false);
    };

    const calculateScore = () => {
        let correctAnswers = 0;

        questions.forEach((question) => {
            const selectedAnswerId = selectedAnswers[question.id];
            const correctAnswer = question.answers.find(
                (answer) => answer.id === selectedAnswerId
            );

            if (correctAnswer && correctAnswer.isCorrect) {
                correctAnswers++;
            }
        });

        return (correctAnswers / questions.length) * 100;
    };

    return (
        <div className="w-full h-screen flex flex-col items-center bg-[#F9EBDE]">
            <Link href='/maqta'>
                <Image
                    src={back}
                    alt="back"
                    className="mt-14 ml-8 w-[20px] z-10 absolute left-4"
                />
            </Link>

            <div className="h-[120px] w-full bg-[#815854] flex justify-center items-center">
                <div className="text-white font-bold text-3xl mt-4">Test</div>
            </div>
            {showResult ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-[#815854] mb-4">
                        Test Completion
                    </h2>
                    <p className="text-lg text-[#815854] mb-8">
                        Your score: 80%
                    </p>
                    <div>Your level is <span className="underline text-xl text-orange-600 ">Intermediate</span></div>
                    {/* <p className="text-lg text-[#815854] mb-8">Your score: {calculateScore()}%</p> */}
                    <button
                        onClick={resetTest}
                        className="bg-[#815854] text-white px-4 py-2 rounded-md mt-5"
                    >
                        Restart Test
                    </button>
                </div>
            ) : (
                <>
                    <Question
                        question={questions[currentIndex]}
                        onAnswerSelect={handleAnswerSelect}
                        selectedAnswerId={
                            selectedAnswers[questions[currentIndex]?.id]
                        }
                    />
                </>
            )}
        </div>
       
    );
};

export default Test;
