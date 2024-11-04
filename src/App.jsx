import { createSignal, Show, onMount } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [userInput, setUserInput] = createSignal('');
  const [aiResponse, setAiResponse] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [recognition, setRecognition] = createSignal(null);
  const [isRecording, setIsRecording] = createSignal(false);
  const [error, setError] = createSignal(null);
  const [inputMethod, setInputMethod] = createSignal('');
  const [voices, setVoices] = createSignal([]);

  onMount(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.lang = 'ar-SA';
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMethod('voice');
        setUserInput(transcript);
        recog.stop();
        setIsRecording(false);
        handleSubmit();
      };

      recog.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('حدث خطأ في التعرف على الصوت. يرجى المحاولة مرة أخرى.');
        setIsRecording(false);
      };

      recog.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recog);
    } else {
      console.warn('Speech Recognition not supported in this browser.');
      setError('ميزة التعرف على الصوت غير مدعومة في هذا المتصفح.');
    }

    // Initialize speech synthesis voices
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };

      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
      setError('ميزة تحويل النص إلى كلام غير مدعومة في هذا المتصفح.');
    }
  });

  const toggleRecording = () => {
    if (recognition()) {
      if (isRecording()) {
        recognition().stop();
        setIsRecording(false);
      } else {
        recognition().start();
        setIsRecording(true);
        setError(null);
      }
    }
  };

  const handleSubmit = async (e = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!userInput().trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: userInput(),
        response_type: 'text',
      });
      setAiResponse(result);

      if (inputMethod() === 'voice') {
        speakResponse(result);
        setAiResponse('');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError('حدث خطأ أثناء الحصول على الإجابة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.lang = 'ar-SA';

      // Select an Arabic voice if available
      const arabicVoices = voices().filter((voice) => voice.lang.startsWith('ar'));
      if (arabicVoices.length > 0) {
        utterance.voice = arabicVoices[0];
      }

      // Stop any ongoing speech synthesis
      window.speechSynthesis.cancel();

      // Handle the end event
      utterance.onend = () => {
        console.log('Speech synthesis finished');
        // Any additional logic after speaking
      };

      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e.error);
        setError('حدث خطأ أثناء تحويل النص إلى كلام. يرجى المحاولة مرة أخرى.');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
      setError('ميزة تحويل النص إلى كلام غير مدعومة في هذا المتصفح.');
    }
  };

  const handleInput = (e) => {
    if (isRecording()) return;
    setUserInput(e.target.value);
    setInputMethod('text');
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4 text-gray-900 flex items-center justify-center">
      <div class="max-w-2xl w-full text-center h-full">
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

        <div class="bg-white p-6 rounded-lg shadow-md h-full">
          <h2 class="text-2xl font-bold mb-4 text-blue-600">مساعد الذكاء الاصطناعي مع التحدث الصوتي</h2>
          <form onSubmit={handleSubmit} class="space-y-4">
            <div class="flex items-center justify-center">
              <button
                type="button"
                class={`px-6 py-3 ${
                  isRecording() ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={toggleRecording}
                disabled={loading()}
              >
                {isRecording() ? 'إيقاف التحدث' : 'ابدأ التحدث'}
              </button>
            </div>
            <textarea
              rows="4"
              placeholder="اكتب سؤالك هنا..."
              value={userInput()}
              onInput={handleInput}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent box-border text-gray-900 mt-4"
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
          <Show when={error()}>
            <div class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error()}
            </div>
          </Show>
          <Show when={aiResponse() && inputMethod() === 'text'}>
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