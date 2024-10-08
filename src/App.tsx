import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import TarotCard from './components/TarotCard';
import BirthDateInput from './components/BirthDateInput';
import TarotReading from './components/TarotReading';
import SelectedCards from './components/SelectedCards';
import { generateTarotReading } from './utils/openai';
import { tarotCards, TarotCard as TarotCardType } from './data/tarotCards';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [reading, setReading] = useState('');
  const [showReading, setShowReading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCardSelect = (id: number) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const handleSubmit = async () => {
    if (birthDate && selectedCards.length === 3) {
      setIsLoading(true);
      setError(null);
      const selectedCardNames = selectedCards.map(id => tarotCards.find(card => card.id === id)?.name);
      try {
        const generatedReading = await generateTarotReading(birthDate, selectedCardNames as string[]);
        setReading(generatedReading);
        setShowReading(true);
      } catch (error) {
        console.error('Error generating tarot reading:', error);
        setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        setShowReading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-4 sm:p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-yellow-300">인터랙티브 타로 카드 리딩</h1>
        <BirthDateInput birthDate={birthDate} setBirthDate={setBirthDate} />
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">카드를 선택하세요 (3장)</h2>
          <div className="relative h-[60vh] mb-8">
            {tarotCards.map((card, index) => (
              <TarotCard
                key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
                selected={selectedCards.includes(card.id)}
                onSelect={handleCardSelect}
                index={index}
                totalCards={tarotCards.length}
              />
            ))}
          </div>
        </div>
        <SelectedCards
          selectedCards={selectedCards.map(id => tarotCards.find(card => card.id === id)!)}
          showImages={showReading}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full sm:w-auto mx-auto text-lg"
          disabled={selectedCards.length !== 3 || !birthDate || isLoading}
        >
          {isLoading ? (
            <span className="animate-spin mr-2">🔮</span>
          ) : (
            <Sparkles className="mr-2" />
          )}
          {isLoading ? '해석 중...' : '타로 결과 보기'}
        </button>
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">오류 발생: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {showReading && <TarotReading reading={reading} />}
      </div>
    </div>
  );
}

export default App;