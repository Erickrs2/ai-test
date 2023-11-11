import { HandlerContext } from "$fresh/server.ts";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
const JOKES = [
  "Why do Java developers often wear glasses? They can't C#.",
  "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  "I love pressing the F5 key. It's refreshing.",
  "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  "There are 10 types of people in the world. Those who understand binary and those who don't.",
  "Why are assembly programmers often wet? They work below C level.",
  "My favourite computer based band is the Black IPs.",
  "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
];

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response>=> {
  const url = new URL(req.url);
  const jokeIndex = url.searchParams.get("jokeIndex");
  let selectedJoke;

  const schema = await req.json();
  
  // Check if 'jokeIndex' is a valid number and within the range of JOKES array
  if (jokeIndex !== null && !isNaN(+jokeIndex) && +jokeIndex >= 0 && +jokeIndex < JOKES.length) {
    selectedJoke = JOKES[+jokeIndex];
  } else {
    // Default to random joke if 'jokeIndex' is not valid
    const randomIndex = Math.floor(Math.random() * JOKES.length);
    selectedJoke = JOKES[randomIndex] + schema.toString();
  }

  return new Response(selectedJoke);
};
