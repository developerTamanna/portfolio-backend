# Backend API

This is the backend API for the portfolio project, built with Node.js, Express.js, and Nodemailer.

## Setup

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone <repository_url>
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**

    Create a file named `.env` in the root of the `backend` directory and add the following environment variables. Replace the placeholder values with your actual credentials.

    ```
    EMAIL_USER=your_gmail_address@gmail.com
    EMAIL_PASS=your_gmail_app_password
    TO_EMAIL=recipient_email_address@example.com
    ```

    *   **`EMAIL_USER`**: Your Gmail address that will be used to send emails.
    *   **`EMAIL_PASS`**: An [App Password](https://support.google.com/accounts/answer/185833?hl=en) generated from your Google account. **Do not use your regular Gmail password.**
    *   **`TO_EMAIL`**: The email address where you want to receive messages from the contact form.

## Running the Application

To start the server, run the following command:

```bash
node index.mjs
```

The server will start on `http://localhost:5000`.

## API Endpoints

### `GET /`

*   **Description**: A simple test endpoint to check if the server is running.
*   **Response**: `Hello World with Express.js and ES Modules!`

### `POST /send-mail`

*   **Description**: Sends an email using Nodemailer with the provided contact form data.
*   **Request Body (JSON)**:

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "subject": "Inquiry about your portfolio",
      "message": "Hello, I'd like to know more about your work."
    }
    ```

*   **Responses**:
    *   `200 OK`: `{"success": true}` - Email sent successfully.
    *   `500 Internal Server Error`: `{"success": false, "error": "Error message"}` - Failed to send email. The `error` field will contain details about the failure.