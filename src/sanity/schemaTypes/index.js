// sanity/schemaTypes/index.js
import post from './post'; // Import the post schema
import author from './author'; // Import the author schema
import category from './category'; // Import the category schema
import blockContent from './blockContent';
import contact from './contact'; // Import the blockContent schema
import event from './event';
import redirect from './redirect';
import leadFormBlock from './objects/leadFormBlock';

export const schema = {
  types: [post, author, redirect, category, blockContent, contact, event, leadFormBlock], // Add all schemas here
};