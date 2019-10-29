import { person, sayHello } from './lib';

// console.log(person.name);

// sayHello(`Azmol`);

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
}
getPosts().then(posts => console.log(posts));
