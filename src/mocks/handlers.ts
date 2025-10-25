// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { mockEncodeJwt } from './mockJwt';

const basePath = 'http://localhost:8080/api';

export const handlers = [
  // Login
  http.post(`${basePath}/auth/login`, async ({ request }) => {

    const payload = {
      sub: '1234567890',
      username: 'mockuser',
      admin: true,
      iat: Math.floor(Date.now() / 1000),
    };

    const encodedJwt = await mockEncodeJwt(payload);
    return HttpResponse.json(
      { token: encodedJwt },
      { status: 200 }
    );
  }),

  // Register
  http.post(`${basePath}/auth/register`, () => {
    return HttpResponse.json({},
      { status: 201 });
  }),

  // Get all recipes
  http.get(`${basePath}/recipes`, () => {
    return HttpResponse.json([
      {
        "id": 1,
        "title": "Hazy IPA",
        "description": "Fruity, juicy IPA with oats for mouthfeel.",
        "instructions": "Mash at 67°C, ferment at 20°C with London Ale III yeast.",
        "ingredients": [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        "author": "Adam",
        "comments": [
          { "user": "brewer42", "content": "Looks tasty!" },
          { "user": "hophead88", "content": "Can’t wait to try this!" }
        ]
    },
    {
        "id": 2,
        "title": "Hazy IPA",
        "description": "Fruity, juicy IPA with oats for mouthfeel.",
        "instructions": "Mash at 67°C, ferment at 20°C with London Ale III yeast.",
        "ingredients": [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        "author": "Adam",
        "comments": [
          { "user": "brewer42", "content": "Looks tasty!" },
          { "user": "hophead88", "content": "Can’t wait to try this!" }
        ]
    }],
      { status: 200 });
  }),

  // Get recipe 1 by ID
  http.get(`${basePath}/recipes/1`, () => {
    // const { id } = useParams();
    // console.log(`recipe id is ${id}`);
    return HttpResponse.json(
      {
        "id": 1,
        "title": "Hazy IPA",
        "description": "Fruity, juicy IPA with oats for mouthfeel.",
        "instructions": "Mash at 67°C, ferment at 20°C with London Ale III yeast.",
        "ingredients": [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        "author": "Adam",
        "comments": [
          { "user": "brewer42", "content": "Looks tasty!" },
          { "user": "hophead88", "content": "Can’t wait to try this!" }
        ]
      },
      { status: 200 });
  }),

  // Get recipe 2 by ID
  http.get(`${basePath}/recipes/2`, () => {
    // const { id } = useParams();
    // console.log(`recipe id is ${id}`);
    return HttpResponse.json(
      {
        "id": 2,
        "title": "Oktoberfest",
        "description": "Malty oktoberfest.",
        "instructions": "Mash at 67°C, ferment at 20°C with London Ale III yeast.",
        "ingredients": [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        "author": "Adam",
        "comments": [
          { "user": "brewer42", "content": "Looks tasty!" },
          { "user": "hophead88", "content": "Can’t wait to try this!" }
        ]
      },
      { status: 200 });
  }),

  // Get user recipes
  http.get(`${basePath}/users/mockuser/recipes`, () => {
    return HttpResponse.json([{
        id: '1',
        title: 'Mock IPA',
        description: 'A hoppy India Pale Ale',
        ingredients: [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        instructions: 'Brew it like a pro.',
        author: 'mockuser',
        comments: [],
      },
    {
        id: '2',
        title: 'Mock Oktoberfest',
        description: 'A malty oktoberfest',
        ingredients: [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        instructions: 'Brew it like a pro.',
        author: 'mockuser',
        comments: [],
      }],
      { status: 200 });
  }),

  // Get user recipes
  http.post(`${basePath}/recipes`, () => {
    return HttpResponse.json({
        id: '1',
        title: 'Mock IPA',
        description: 'A hoppy India Pale Ale',
        ingredients: [
          { "type": "grain", "name": "Pale Malt", "amount": 4.5, "units": "kg" },
          { "type": "hop", "name": "Citra", "amount": 50, "units": "g" }
        ],
        instructions: 'Brew it like a pro.',
        author: 'mockuser',
        comments: [],
      },
      { status: 200 });
  }),

  // Submit comment
  http.post(`${basePath}/recipes/:id/comment`, () => {
    return HttpResponse.json({},
      { status: 200 }
    );
  }),

  // Submit comment
  http.post(`${basePath}/recipes/1/comment`, () => {
    return HttpResponse.json({},
      { status: 200 }
    );
  }),

  // Submit comment
  http.post(`${basePath}/recipes/2/comment`, () => {
    return HttpResponse.json({},
      { status: 200 }
    );
  }),
];
