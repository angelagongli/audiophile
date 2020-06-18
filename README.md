# Audiophile

## Description
Audiophile is a full stack interactive media player application integrated with the YouTube API. Its main function is the ability to jointly control media playback, as well as make real-time comments. The app also includes a YouTube track search feature.

The app is deployed here: https://powerful-wildwood-99807.herokuapp.com/

## Usage
Sign up and log into the application, and first choose a track by utilizing the YouTube track search feature.

Once you save your chosen track, you can go to your queue and begin a conversation with one other user. If you planned this and your friend is currently on the app, they will be notified in real time with a link to the conversation.

Once you and your friend are in the conversation, your playback is linked, and playing and pausing by one person will directly control the other person's player as well. You can view information about the playback beneath the player, and comment in real time to the right of the player. You can also edit or delete your own comments in the comment box.

![demo gif](audiophile-demo.gif)

(view as [.mp4](https://github.com/angelagongli/audiophile/blob/master/audiophile-demo.mp4))

## Credits
The app is powered by an [Express](http://expressjs.com/) server and a [MongoDB](https://www.mongodb.com/) database controlled by the [mongoose](https://www.npmjs.com/package/mongoose) object modelling tool.

The [mLab MongoDB](https://devcenter.heroku.com/articles/mongolab) Heroku add-on hosts the MongoDB database used by the deployed app on the cloud.

User authentication is performed with [passport](https://www.npmjs.com/package/passport) and its [passport-local](https://www.npmjs.com/package/passport-local) strategy, [express-session](https://www.npmjs.com/package/express-session) serves as session middleware, and [bcrypt.js](https://www.npmjs.com/package/bcryptjs) performs password hashing in the user model.

The app's front-end is written in [React](https://reactjs.org/), and uses [React Router](https://reacttraining.com/react-router/) and the [Material-UI](https://material-ui.com/) React component library for routing and styling.

The [axios](https://www.npmjs.com/package/axios) npm package is used to call the API routes, and [Socket.IO](https://socket.io/) emits and detects events caused by user actions to enable the real-time interactivity. [RxJS](https://rxjs.dev/) provides the timer that controls the app's information updating.

The favicon image and icons were taken from the collection of icons at [Font Awesome](https://fontawesome.com/).

## Future Development
The main focus of future development will be fine-tuning the app's routing, validation, and notification system. As it currently is, Audiophile trusts the user to correctly use the application exactly as it is intended (i.e. playing only one track at one time, visiting only a valid address that can be accessed via live link from the site at the time), and does not take into consideration other situations.

## License
Copyright (c) Angela Li. All rights reserved.
Licensed under the [MIT License](LICENSE).