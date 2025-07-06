---
title: React Project Beginnings
date: '2025-07-05T21:39:00Z'
tags: ['project', 'web', 'react']
summary: A new project for some reason
layout: PostLayoutReduced
draft: true
canonicalUrl:
---

# Step 0 - WTF?!

As in "What the Flip?" Now go wash your mind out with soap. Shame on you.

So I had a thought:

> Hey, I'd like to relive the glory days of the mid 90's, playing Legend of the Red Dragon, but on the web!

Then I had another thought:

> How hard could it possibly be to recreate that experience in React?!

And since it's always a good idea to plow forward with hare-brained ideas like this, I've decided to go right ahead and
entertain this madness.

What I'd like to do:

> Build a text-based RPG-like thing using React, C#, and a database of sorts

We'll be using React and C# to build a clone of the old BBS game Legend of the Red Dragon. This will involve having a data store with all our content (towns, encounter areas, etc), and a front-end that will read this content for display to the user. They'll be able to navigate towns for buying supplies and resting, and navigate the encounter areas to search for adventure. Ideally, it will allow for multiple players to be connected, and for them to be able to party up and adventure together. This is going to be hard, and that's a good thing.

React with plain JavaScript will be our front-end, and our back-end will be written in C#, with a SQLite database most likely. If we need a document store, there's also a NoSQLite database we can use for that. I like the idea of the database being a simple file. For forms, we'll try the react-hook-forms library, since that's popular, I guess. As for making it look pretty, ShadCN seems to be a thing so we'll see if we can get away with JavaScript on that one. If not, we'll just try basic Tailwind classes and see how far that gets us. I really don't care too much how this thing looks.

Actually ensuring the multiplayer aspect works perfectly will be a major stretch goal, since I'll just be running locally the entire time, and probably not even deploying it anywhere (although the blog site might work...). If anything, I'll use `ngrok` to test the multiplayer locally between a couple different machines.

We'll be using what we reasonably can from Writing Effective Use Cases. Not all of it, since it's a bit much. I believe that a good grasp of use cases can greatly enhance the building of software. This will also be another exercise in TDD, once we're building the "production" version. This will be after a round or three of prototyping the main game loop, and possibly a couple other things, collecting use cases along the way. I suspect there will be many of them, but we'll deal with it.

"Why in the world would someone do something so crazy? Has he gone mad?", you might be asking.. Well, yes, naturally I am a bit mad, but this will also be a good way to try dev-logging, and a good excuse to mess with this blog again. It will also help further solidify my React and Tailwind skills, and see if we can use this fancy new ShadCN stuff in JavaScript. It will also be interesting to see if it's possible to write a multiplayer game in React, and even more interesting to see if it's even remotely possible to limit the ability to cheat using these languages and tools.

This will be subject to motivation, which is unbelievably scarce nowadays. So, if these articles suddenly stop for a couple weeks, that probably means I've moved on, or have burnt out. I'll try to post a final article for closure, but don't count on it. Just want to manage expectations. Also, the frequency of articles will probably vary, since sometimes there will be a lot to write about, and other times there won't be. I'll try to be clear about what I'm currently doing.

The plan is to write about:

- what I'm thinking
- the decisions I'm making and why
- a high-level overview of what I'm doing now

What this won't be:

- a tutorial on how to make this particular project
- a conversation with anyone subjecting themselves to this nonsense (there's no comments plugin setup for this site)
- something I ever intend to make money with
