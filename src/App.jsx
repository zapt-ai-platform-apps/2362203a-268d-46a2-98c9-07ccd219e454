function App() {
  return (
    <div class="min-h-screen bg-gray-100 p-4 text-gray-900 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4 text-blue-600">تبادل المعلومات التقنية للمكفوفين</h1>
        <p class="text-xl text-gray-700 mb-8">
          منصة تهدف إلى تمكين المكفوفين من مشاركة وتبادل المعلومات التقنية بسهولة ويسر.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}

export default App;