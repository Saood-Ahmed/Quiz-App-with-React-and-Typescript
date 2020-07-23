import { shuffleArray } from "./Utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QusetionState = Question & { answer: string[] };

export enum Difficulty  { 
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {

    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(url)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answer: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
        ])
    }))
}