# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting Up the Application
To set up the application, you'll need to configure certain credentials and settings. Below are the steps to do so:

## Database Configuration
DB_HOST: Set the host for your database. Typically, it's 'localhost' for a local database.
DB_PORT: Specify the port number for your database. The default for PostgreSQL is 5432, but it may vary depending on your setup.

## Security and Secret Key
SECRET_KEY: Provide a secret key for securing your application. This key is used for various security purposes, such as authentication and encryption.
## Email Configuration
PASSWORD_EMAIL: This should be the password for the email account you plan to use for sending emails. You will need to configure your email provider settings as well.

## Configuring Gmail Account for Sending Emails
If you plan to use Gmail for sending emails, follow these steps to configure your Gmail account:

## Create an App Password:

Visit your Google Account settings (https://myaccount.google.com/).
Navigate to the "Security" section.
Under the "Signing in to Google" section, select "App passwords."
Generate a new App Password specifically for your application.
Use the App Password:

In your application's email configuration, use the email address and the App Password you generated in the previous step.
Ensure that your application has the necessary permissions to access and send emails through your Gmail account.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
