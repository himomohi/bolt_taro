import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateTarotReading(birthDate: string, selectedCards: string[]) {
  const prompt = `
    생년월일: ${birthDate}
    선택된 타로 카드: ${selectedCards.join(', ')}

    당신은 타로 전문가 입니다.위 정보를 바탕으로 타로 카드 해석을 해주세요. 각 카드의 의미와 전체적인 해석을 포함해 주세요.
    해석은 친근하고 긍정적인 톤으로 항상 이모지와 함께 작성해 주세요.
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('OpenAI API 오류:', error.response.status, error.response.data);
        throw new Error(`OpenAI API 오류: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('OpenAI API 요청 실패:', error.message);
        throw new Error('OpenAI API에 연결할 수 없습니다. 네트워크 연결을 확인해 주세요.');
      }
    }
    console.error('타로 해석 생성 중 오류 발생:', error);
    throw new Error('타로 해석을 생성하는 중 알 수 없는 오류가 발생했습니다.');
  }
}