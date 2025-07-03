import { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import GitHubLink from '../components/GitHubLink';
import { useCatechism } from '../utils/useCatechism';

export default function Home() {
  const [query, setQuery] = useState('');
  const { lessons, results } = useCatechism(query);
  const [openLessons, setOpenLessons] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  const toggleAll = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    setOpenLessons(Object.fromEntries(lessons.map((l) => [l.lesson_number, newState])));
  };
  const toggleLesson = (num) =>
    setOpenLessons((prev) => ({ ...prev, [num]: !prev[num] }));

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Baltimore Catechism No. 2</h1>
        <div className="flex items-center gap-2">
          <GitHubLink />
          <ThemeToggle />
        </div>
      </div>
      <div className="mb-4">
        <input
        type="text"
        placeholder="Search questions..."
        className="w-full p-2 border rounded mb-8 dark:bg-gray-800 dark:border-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        
      </div>
      <button
        onClick={toggleAll}
        className="px-3 py-2 border rounded mb-8 dark:border-gray-700"
      >
        {allExpanded ? 'Collapse All' : 'Expand All'}
      </button>

      {query ? (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          {results.length === 0 && <p>No results found.</p>}
          {results.map((item) => (
            <div key={item.number} className="mb-4">
              <div className="grid gap-2 mb-1" style={{gridTemplateColumns:'6ch 2ch 1fr'}}>
                <span className="font-semibold">{item.number}.</span>
                <span className="font-semibold">Q.</span>
                <span>{item.question}</span>
              </div>
              <div className="grid gap-2 mb-4" style={{gridTemplateColumns:'6ch 2ch 1fr'}}>
                <span>&nbsp;</span>
                <span className="font-bold">A.</span>
                <span>{item.answer}</span>
              </div>
              <p className="text-sm text-gray-500">
                {item.lesson_number}: {item.lesson_title}
              </p>
            </div>
          ))}
        </section>
      ) : (
        lessons.map((lesson) => (
          <section key={lesson.lesson_number} className="mb-10">
            <button
              onClick={() => toggleLesson(lesson.lesson_number)}
              className="text-2xl font-semibold mb-4 flex justify-between w-full text-left"
            >
              <span>{lesson.lesson_title}</span>
              <span>{openLessons[lesson.lesson_number] ? '−' : '+'}</span>
            </button>
            {openLessons[lesson.lesson_number] &&
              lesson.questions.map((q) => (
              <div key={q.number} className="mb-4">
                <div className="grid gap-2 mb-1" style={{gridTemplateColumns:'6ch 2ch 1fr'}}>
                <span className="font-semibold">{q.number}.</span>
                <span className="font-semibold">Q.</span>
                <span>{q.question}</span>
              </div>
                <div className="grid gap-2 mb-4" style={{gridTemplateColumns:'6ch 2ch 1fr'}}>
                <span>&nbsp;</span>
                <span className="font-bold">A.</span>
                <span>{q.answer}</span>
              </div>
              </div>
            ))}
          </section>
        ))
      )}
    </main>
  );
}
