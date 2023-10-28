# MiniBlog App
This is a simple blogging platform created using Node.js, Express, and the HBS (Handlebars) template engine
## Features
- User authentication using Google OAuth2.0
- Create and edit stories
- View public stories
- User-friendly interface with HBS templates for rendering.
## Prerequisites
- Node.js
- npm
- MongoDB

## Installation
1. Clone the repository
```
git clone https://github.com/greathafiz/mini-blog-app
cd mini-blog-app
```
2. Install the dependencies:
```
yarn
```
3. Create a `.env` file in the project root directory and set the environment variables in the `.env.example` file
4. Start the application:
```
yarn dev
```
5. The app should now be running on [http://localhost:3000](http://localhost:3000/).

## Usage
1. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000/).
2. Login with your Google account.
3. Create, edit, and view stories/blog posts.
4. Log out when you're done.

## Dependencies
This mini blog app relies on several npm packages, including:
- connect-mongo
- dotenv 
- express
- express-handlebars
- express-session
- method-override
- moment
- mongoose
- morgan
- passport
- passport-google-oauth20
	devDependencies:
    - cross-env
    - nodemon

## Online Deployment
The MiniBlog app is already hosted online and can be accessed via the following URL: https://mini-blog-app.onrender.com/