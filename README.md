# React Example App

This is a Vite + React application, ready to be deployed to Netlify.

## Local Development

To run the app locally:

```bash
npm install
npm run dev
```

## Deployment to Netlify

This project is pre-configured for deployment on Netlify. It includes a `netlify.toml` file that specifies the build command (`npm run build`), the publish directory (`dist`), and sets up a redirect rule so that client-side routing works correctly.

### Steps to Deploy via GitHub

1. **Push to GitHub:**
   - Initialize a git repository if you haven't already: `git init`
   - Add your files: `git add .`
   - Commit your changes: `git commit -m "Initial commit"`
   - Create a new repository on GitHub and push your code.

2. **Connect to Netlify:**
   - Log in to your [Netlify](https://app.netlify.com/) account.
   - Click **Add new site** > **Import an existing project**.
   - Select **GitHub** and authorize Netlify.
   - Choose your repository.
   - Netlify will automatically detect the settings from the `netlify.toml` file.
   - Click **Deploy site**.

3. **Environment Variables (Optional):**
   - If your app uses environment variables (like `GEMINI_API_KEY`), make sure to add them in the Netlify dashboard under **Site configuration** > **Environment variables**.

Your app will be live in a few minutes!
