# OpenAI API Key Setup

To connect the ChatGPT API to the Farmer Digital Twin application:

## Steps:

1. **Get your OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign in or create an account
   - Click "Create new secret key"
   - Copy the API key

2. **Create a `.env` file in the `backend` directory:**
   - Create a new file named `.env` (not `.env.txt`)
   - Add the following line:
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```
   - Replace `your_actual_api_key_here` with your actual API key from step 1

3. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   python app.py
   ```

The backend will automatically load the API key from the `.env` file when it starts.

## Security Note:
- Never commit the `.env` file to version control
- Keep your API key secret and don't share it publicly

