import { useMemo } from 'react';
import catechismData from '../baltimore-catechism-no-2/baltimore-catechism-no-2.json';

export function useCatechism(searchQuery) {
  const lessons = catechismData.lessons;

  const results = useMemo(() => {
    if (!searchQuery?.trim()) return [];
    const searchTerm = searchQuery.trim().toLowerCase();
    
    // If it's a number search, look for exact or partial number match
    if (/^\d+$/.test(searchTerm)) {
      return lessons.flatMap(lesson => 
        lesson.questions
          .filter(q => q.number.toString().includes(searchTerm))
          .map(q => ({
            ...q,
            lesson_number: lesson.lesson_number,
            lesson_title: lesson.lesson_title
          }))
      );
    }
    
    // Simple case-insensitive text search across questions and answers
    return lessons.flatMap(lesson => 
      lesson.questions
        .filter(q => 
          q.question.toLowerCase().includes(searchTerm) || 
          q.answer.toLowerCase().includes(searchTerm)
        )
        .map(q => ({
          ...q,
          lesson_number: lesson.lesson_number,
          lesson_title: lesson.lesson_title
        }))
    );
  }, [searchQuery, lessons]);

  return { lessons, results };
}
