# Chat App

A real-time chat application built using React.js, Redux, TypeScript, Node.js, Express.js, Socket.io, and Mongoose, styled with Tailwind CSS. The application supports live chat functionality with user authentication and message handling through a WebSocket connection.

# [Live Link](https://realtime-chat-app-tajbir.web.app)

## Features

- **Real-time Chat:** Instant messaging with WebSocket (Socket.io)
- **Friend List:** Manage and view a list of friends
- **Real-time Active Status:** See which friends are currently online
- **Block/Unblock Users:** Block and unblock users from sending messages
- **Browser Notifications:** Receive notifications for new messages and events
- **My Day:** Share daily updates (like stories)
- **My Day Likes and Comments:** Like and comment on your friends' updates
- **Notification:** Like and comment realtime notification, unread notification, new notification
- **Message delete:** Message delete for me
- **Message unsent:** Message unsent for everyone
- **Message edit:** Message edit for everyone
- **Unsent message can't unsent:** unsent message can't unsent again but unsent message can delete for me
- **One time edit message:** One time edit message for everyone
- **End to End encryption:** message is encrypted. when user offline then automatic delete message or when user turn off encryption then message is delete

## Technologies

- **Frontend:**
  - React.js
  - Redux Toolkit
  - TypeScript
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - Socket.io
  - Mongoose (MongoDB)

## Installation

### Prerequisites

- **Node.js**: Install from [Node.js official site](https://nodejs.org/)
- **MongoDB**: Set up MongoDB on your local machine or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution

### Steps

1. **Clone the Repositories:**

   - **Client Side:**
     ```bash
     git clone https://github.com/Tajbir23/realtime-chat-app.git
     cd realtime-chat-app
     ```

   - **Server Side:**
     ```bash
     git clone https://github.com/Tajbir23/realtime-chat-app-server.git
     cd realtime-chat-app-server
     ```

2. **Install Dependencies:**

   Install the dependencies for both the client and server:

   ```bash
   # Install client dependencies
   cd client
   npm install

    VITE_API=your_api_url
    VITE_IMAGE_SECRET=your_image_secret
    VITE_CLOUDINARY_CLOUDNAME=your_cloudinary_cloudname


   # Install server dependencies
   cd ../server
   npm install

    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
