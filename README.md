# Twiks 📃

Twiks is a Twitter-like front-end project

## Topics ✍️

- [Development](#development)
  - [Run](#run)
  - [Tests](#tests)
  - [Project standards](#project-standards)
- [Planning](#planning)
- [Critique](#critique)

## Development

### Run

To run the project you must have installed [node](https://nodejs.org/en/)


To install dependencies:

```bash
yarn
```

To run the project in development:

```bash
yarn dev
```

### Tests

To run tests:

```bash
yarn test
```

### Project standards

To run eslint:

```bash
yarn lint
```

To run prettier:

```bash
yarn format
```


## Planning 📉

- Proposal:
The Product Manager wants to implement a new feature called "reply-to-post" (it's a lot like Twitter's These are regular posts that use "@ mentioning" at the beginning to indicate that it is a reply directly to a post. Reply posts should only be shown in a new, secondary feed on the user profile called "Posts and Replies" where all original posts and reply posts are shown. They should not be shown in the homepage feed.

- Questions:
  - What is the value of this feature?
  - This value was previously evaluated by users experience tests like A/B or alike?
  - What is the priority of this feature?
  - The user can do it for itself?
  - The reply posts can be showed to every user?
  - What can we expect in the mentioning?
  - How we're going to know what post are replied with only the username? 

- Solution:

For this new feature, some approaches can be taken, and assuming the follow:
 - the feature is valid
 - was previously tested and accepted by the target Audience
 - the priority is high, so we must deliver it as soon as possible
 - the user can do it for itself
 - other users can see each other's reply posts
 - The mentioning will have only the username
 - We`ll get the last post of the user

This is the approach I would bring to discussion with the team:

First we need see the database: 
- make sure that the database can handle such thing.
- tha database must be able to receive a type

Then we need to change the api:
- The endpoint of add posts must be able to accept a new parameter to define that there is a mentioning
- We use this new param to enter a new flow, where the mention can be used to look for a user
- With the user we get his last post.
- Then we save this post together
- The type to be saved could be: 'reply-post'

And in the front-end:
- In the input we add a changeHandle to detect when a mention will happen (looking for an '@')
- When it happens, the type: 'reply-post' will be added to the request along with the message and the user
- In the profile, where the reply-post must appear, we can apply a tab approach, like twitter's topic in discover
- In one tab we'll have the posts of the user
- In other tag, we'll have reply-posts

## Critique 📈

For this project I chose to use a fill technologies that would deliver what is needed and to improve myself. Some of those were:

- [Vite](https://vitejs.dev/guide/#overview)

I use vite to create the app, because Vite provides a fast and simple development environment, which was really handy. For this, in a scale, maybe would be interesting to think about a server side rendering, which vite is capable to do and some parts of the project could take some advantage of this feature. Possibly even change Vite for Next, could be a good option to.

- [React](https://pt-br.reactjs.org/)

React was my choice of approach for its proximity to Javascript code, which makes more maintainable if we think of numbers of developers available to do so, but for a large scale and performance, I would thoth of change it for Vue, for the number of possibilities that a Framework can bring to project like this. Even if Vite can provide a good code splitting, do it with Vue could bring good advantage for some scenarios. Anyway this choice will depend on the team and the direction of the company  

- [Tailwind](https://tailwindcss.com/docs/appearance)

Tailwind is a utility framework for css that I use to simplify the development of the UI, since this is not my strength, and the time needed to do some better looking app could last as long as my mind can go, this is one good point of improvement. The components are good spared, but could be more. In order to keep the UI solid, make a micro front end can be a good solution. Break even more the components and think about the possibilities that it could have, make a framework alike for the project could enable other projects for other aspects of the company to use and maintain.

Was not used in here to keep things simple, but put the project into a Docker container is mandatory, in my opinion, to a collaborative and scalable project.
