import { createSignal, onMount, createEffect, For, Show } from 'solid-js';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SolidMarkdown } from 'solid-markdown';
import { createEvent } from './supabaseClient';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [posts, setPosts] = createSignal([]);
  const [newPost, setNewPost] = createSignal({ title: '', content: '' });
  const [loading, setLoading] = createSignal(false);
  const [audioUrl, setAudioUrl] = createSignal('');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    if (user()) {
      fetchPosts();
    }
  });

  const savePost = async (e) => {
    e.preventDefault();
    if (!newPost().title || !newPost().content) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('posts').insert([
        {
          title: newPost().title,
          content: newPost().content,
          user_id: user().id,
        },
      ]);
      if (error) throw error;
      setNewPost({ title: '', content: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextToSpeech = async (text) => {
    setLoading(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: text,
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4 text-gray-900">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">Sign in with ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                showLinks={false}
              />
            </div>
          </div>
        }
      >
        <div class="max-w-4xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-blue-600">TechExchange</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-1">
              <h2 class="text-2xl font-bold mb-4 text-blue-600">Create New Post</h2>
              <form onSubmit={savePost} class="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newPost().title}
                  onInput={(e) => setNewPost({ ...newPost(), title: e.target.value })}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent box-border"
                  required
                />
                <textarea
                  placeholder="Content"
                  value={newPost().content}
                  onInput={(e) => setNewPost({ ...newPost(), content: e.target.value })}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent box-border"
                  rows="5"
                  required
                ></textarea>
                <button
                  type="submit"
                  class={`w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading()}
                >
                  {loading() ? 'Saving...' : 'Submit'}
                </button>
              </form>
            </div>

            <div class="md:col-span-2">
              <h2 class="text-2xl font-bold mb-4 text-blue-600">Technical Posts</h2>
              <Show when={!loading()} fallback={<p>Loading posts...</p>}>
                <For each={posts()}>
                  {(post) => (
                    <div class="bg-white p-6 rounded-lg shadow-md mb-4">
                      <h3 class="text-xl font-bold mb-2 text-blue-600">{post.title}</h3>
                      <p class="text-gray-700 mb-4">{post.content}</p>
                      <div class="flex space-x-4">
                        <button
                          onClick={() => handleTextToSpeech(post.content)}
                          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                          Listen
                        </button>
                      </div>
                    </div>
                  )}
                </For>
              </Show>
              <Show when={audioUrl()}>
                <div class="mt-4">
                  <h3 class="text-xl font-bold mb-2 text-blue-600">Audio Playback</h3>
                  <audio controls src={audioUrl()} class="w-full" />
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;