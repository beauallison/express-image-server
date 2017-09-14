express-image-server
=====

## Work In Progress

This is a work in progress for a simple Node.js API to handling the storing and retrieval of images in MongoDB GridFS.

The implementation largely uses async / await and as such Node `7.6.0` is required at a minimum.

The application will provide Express routes for creating, deleting, getting images in GridFS as well as providing resized renditions of existing images.

## Setup & Testing

### Requirements

At a minimum the following is required

- A local MongoDB instance greater than `v3.0`
- Node.js `7.6.0`

### Getting Started

The following instructions are for general installation and to run through the provided test cases. It assumes an OSX environment with NVM installed and comfortability to use VI.

_These instructions assume MongoDB is started_

1. Clone this repo
1. `nvm install`
1. `npm install`
1. `cp config/default.json config/test.json`
1. `vi config/test.json` _& apply your mongoDB config_
1. `npm test`