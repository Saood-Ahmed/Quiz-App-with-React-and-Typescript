import React from 'react';
import { AnswerObject } from '../App';

type Props = {
    question: string;
    answers: string[];
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ 
    question,
    answers,
    callBack,
    userAnswer,
    questionNumber,
    totalQuestions
 }) => {

    return(
        <div className="container">
            <h4 className="number">
                Question: {questionNumber} / {totalQuestions}
            </h4>
            <h4 dangerouslySetInnerHTML={{ __html: question }}/>
            <div>
                {
                    answers.map(ans => (
                        <div key={ans}>
                        <button disabled={userAnswer? true : false} className="u-full-width" value={ans} onClick={callBack}>
                            <h5 dangerouslySetInnerHTML={{ __html: ans }} />

                            
                        </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default QuestionCard;