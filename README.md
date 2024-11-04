# TechExchange for the Visually Impaired

TechExchange is a dedicated platform designed to facilitate the exchange of technical information among visually impaired users. The application focuses on accessibility to ensure that users who are blind or have low vision can easily share and access technical content.

## Features

1. **User Authentication:**
   - Users can sign in with ZAPT, utilizing Supabase authentication.
   - Supports social login providers: Google, Facebook, and Apple.

2. **Accessible Interface:**
   - The app is designed with accessibility in mind, adhering to ARIA standards.
   - All interactive elements are keyboard navigable, and proper semantic HTML is used.

3. **Post Technical Information:**
   - Users can create new posts to share technical information.
   - The post editor supports plain text input suitable for screen readers.

4. **View and Read Posts:**
   - Users can browse a list of technical posts shared by others.
   - Each post can be expanded to read the full content.

5. **Text-to-Speech Functionality:**
   - Integrated text-to-speech feature allows users to listen to the content of posts.
   - Enhances accessibility for users who prefer auditory content consumption.

6. **Responsive Design:**
   - The application is responsive and works well on various screen sizes.
   - The design is clean and user-friendly, focusing on ease of use.

7. **Error Logging with Sentry:**
   - Sentry is integrated for error tracking in both frontend and backend.
   - Helps in monitoring and improving application stability.

## User Journey

### 1. Signing In

- **Step 1:** Open the app, and you are presented with the sign-in page.
- **Step 2:** Click on "Sign in with ZAPT".
- **Step 3:** Choose your preferred authentication method (Email, Google, Facebook, Apple).
- **Step 4:** Upon successful authentication, you are redirected to the home page.

### 2. Browsing Technical Posts

- **Step 1:** On the home page, you see a list of recent technical posts.
- **Step 2:** Use keyboard navigation or screen reader commands to browse through the list.
- **Step 3:** Select a post to expand and read its full content.
- **Step 4:** Use the text-to-speech feature to listen to the post if desired.

### 3. Creating a New Post

- **Step 1:** Navigate to the "Create Post" section.
- **Step 2:** Enter the title and content of your technical information.
- **Step 3:** Click the "Submit" button to publish your post.
- **Step 4:** Your post now appears in the list and is accessible to other users.

### 4. Signing Out

- **Step 1:** Navigate to the "Sign Out" button at the top of the page.
- **Step 2:** Click the button to sign out of your account.
- **Step 3:** You are redirected back to the sign-in page.

## External APIs and Services

- **Supabase Authentication:**
  - Used for user authentication and session management.
  - Provides secure and easy-to-use authentication flows.

- **Text-to-Speech API:**
  - Utilizes the "text_to_speech" event to convert text content into speech.
  - Enhances accessibility by providing auditory content.

- **Sentry:**
  - Used for error logging and monitoring.
  - Helps in identifying and fixing issues in the application.

## Accessibility Considerations

- All buttons and interactive elements have clear labels.
- The design uses high-contrast colors for better visibility.
- ARIA attributes are implemented to improve screen reader compatibility.
- Keyboard navigation is fully supported throughout the app.

## Environment Variables

The following environment variables are required for the application:

- `VITE_PUBLIC_APP_ID`: The public App ID for ZAPT integration.
- `VITE_PUBLIC_SENTRY_DSN`: The DSN for Sentry error logging.
- `VITE_PUBLIC_APP_ENV`: The application environment (e.g., production, development).

Make sure to set these variables in your deployment environment.

## Note

This application focuses on providing an accessible platform for the visually impaired community to share and access technical information easily. Your feedback and suggestions are welcome to further improve the app's accessibility and user experience.