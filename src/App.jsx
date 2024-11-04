import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [userInput, setUserInput] = createSignal('');
  const [aiResponse, setAiResponse] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput().trim()) return;

    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: userInput(),
        response_type: 'text'
      });
      setAiResponse(result);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4 text-gray-900 flex items-center justify-center">
      <div class="max-w-2xl w-full text-center">
        <h1 class="text-4xl font-bold mb-4 text-blue-600">تبادل المعلومات التقنية للمكفوفين</h1>
        <p class="text-xl text-gray-700 mb-8">
          منصة تهدف إلى تمكين المكفوفين من مشاركة وتبادل المعلومات التقنية بسهولة ويسر.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://t.me/echangetec"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          >
            قناة تبادل المعلومات التقنية على Telegram
          </a>
          <a
            href="https://t.me/Youness_be"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          >
            مجموعتنا على Telegram
          </a>
          <a
            href="https://www.youtube.com/@echangetec"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          >
            قناتنا على YouTube
          </a>
          <a
            href="https://www.facebook.com/groups/1802881706649541/?ref=share"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          >
            مجموعتنا على Facebook
          </a>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4 text-blue-600">مساعد الذكاء الاصطناعي</h2>
          <form onSubmit={handleSubmit} class="space-y-4">
            <textarea
              rows="4"
              placeholder="اكتب سؤالك هنا..."
              value={userInput()}
              onInput={(e) => setUserInput(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent box-border text-gray-900"
              required
            ></textarea>
            <button
              type="submit"
              class={`w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                loading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading()}
            >
              <Show when={!loading()} fallback={'جاري التحميل...'}>
                أرسل
              </Show>
            </button>
          </form>
          <Show when={aiResponse()}>
            <div class="mt-6 p-4 bg-gray-100 rounded-lg text-right">
              <h3 class="text-xl font-bold mb-2 text-blue-600">الإجابة:</h3>
              <p class="text-gray-800 whitespace-pre-line">{aiResponse()}</p>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default App;