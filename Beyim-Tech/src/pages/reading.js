import { useState, useEffect } from 'react';
import Image from 'next/image';
import back from '../../public/images/back.png';
import Link from 'next/link';
import "../app/globals.css";

const Reading = () => {
    const [readingData, setReadingData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://3.71.166.30:8000/api/v1/reading/1/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setReadingData(data);
            } catch (error) {
                console.error('Error fetching reading data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAnswerClick = (answerId) => {
        setSelectedAnswer(answerId);

        // Find the correct answer for the current question set
        const correctAnswerId = readingData.questions[0].answers.find((answer) => answer.is_correct)?.id;

        // Check if the selected answer is correct
        if (answerId === correctAnswerId) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        setShowFeedback(true); // Display feedback
    };

    const handleClose = () => {
        // Close the page (you can implement specific behavior here, e.g., navigate back)
        window.close(); // This will attempt to close the current window/tab
    };

    if (!readingData) {
        return <div>Loading...</div>;
    }

    const { content, questions } = readingData;
    const firstQuestionSet = questions[0]; // Displaying the first set of questions

    return (
        <div className="w-full h-screen flex flex-col items-center bg-[#F9EBDE]">
            <Link href="/maqta">
                <Image src={back} alt="back" className="mt-14 ml-8 w-[20px] z-10 absolute left-4" />
            </Link>

            <div className="h-[120px] w-full bg-[#815854] flex flex-col justify-center items-center">
                <div className="text-white font-bold text-3xl">Reading</div>
            </div>

            <div className="w-[85%] mt-[30px]  bg-white flex flex-col p-3 rounded-2xl items-center">
                <div className="border-2 border-[#815854] rounded-2xl w-[95%] text-center text-sm text-[#815854] flex items-center px-3">
                    <p className="whitespace-pre-wrap">{content}</p>
                </div>
                <div className="border-2 border-[#815854] rounded-2xl w-[95%] mt-4 text-center text-sm text-[#815854] flex flex-col items-center px-3 space-y-5">
                    <div key={firstQuestionSet.id} className="text-[#815854] font-bold text-lg flex flex-col">
                        <p className="mb-2">{firstQuestionSet.prompt}</p>
                        <div className="spacing-y-4 flex flex-col mb-2">
                            {firstQuestionSet.answers.map((answer) => (
                                <div
                                    key={answer.id}
                                    className={`text-[#815854] my-2 font-bold text-lg w-[275px] h-[50px] flex justify-center items-center rounded-2xl bg-[#F9EBDE] cursor-pointer ${
                                        selectedAnswer === answer.id ? 'bg-green-400' : ''
                                    }`}
                                    onClick={() => handleAnswerClick(answer.id)}
                                >
                                    {answer.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    {showFeedback && (
                        <div className="text-[#815854] font-bold text-lg">
                            {isCorrect ? 'Correct!' : 'Incorrect!'}
                        </div>
                    )}
                    {showFeedback && (
                        <button className="bg-[#815854] text-white px-4 py-2 rounded mt-4" onClick={handleClose}>
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reading;
