const Question = ({ question, onAnswerSelect, selectedAnswerId }) => {
    if (!question) return null;

    const handleAnswerClick = (answerId) => {
        onAnswerSelect(question.id, answerId);
    };

    return (
        <div className="w-[320px] h-[380px] flex flex-col items-center bg-white space-y-3 mt-10">
            <div className="font-bold text-[#815854] text-md mb-10 mt-4">{question.text}</div>
            {question.answers.map((answer) => (
                <button
                    key={answer.id}
                    onClick={() => handleAnswerClick(answer.id)}
                    className={`w-[271px] h-[47px] flex justify-center items-center rounded-2xl text-xl font-bold text-[#815854] bg-[#F9EBDE] ${
                        selectedAnswerId === answer.id ? 'bg-[#815854] text-white' : ''
                    }`}
                >
                    {answer.text}
                </button>
            ))}
        </div>
    );
};

export default Question;
