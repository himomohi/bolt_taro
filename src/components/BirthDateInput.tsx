import React from 'react';
import { Calendar } from 'lucide-react';

interface BirthDateInputProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
}

const BirthDateInput: React.FC<BirthDateInputProps> = ({ birthDate, setBirthDate }) => {
  return (
    <div className="mb-6">
      <label htmlFor="birthDate" className="block text-lg font-medium mb-2">
        생년월일을 입력하세요
      </label>
      <div className="relative">
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>
    </div>
  );
};

export default BirthDateInput;