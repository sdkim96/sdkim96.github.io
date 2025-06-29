---
layout: post
title: "Why We Shouldn't Blindly Copy-Paste AI-Generated Code"
date:   2025-06-29 17:51:00 +0900
categories: [blog, GitHub]
---

## The Illusion of Intelligence: When AI Sounds Smart But Isn’t

I watched a YouTube video of ThePrimeagen’s experience with vibe coding. [In the video](https://www.youtube.com/watch?v=Aqj1Z1vgE6I), he shared his experience building a Twitch-integrated server that uses some APIs from Twitch. 

When he reached the point of implementing login functionality, Claude generated code that didn’t fully consider security aspects, making it potentially vulnerable to client-side attacks. 

So he asked Claude 3.5 something like:
"Hey I need a login. We’re going to use Twitch, and I need to be able to store obviously my session data, so I can make sure when someone makes the HTTP request, I know who I’m talking to.” 

When he did that, the AI replied, “Oh that’s a really good concern!” — which was both hilarious and ironic, because if he didn’t understand sessions, his server could have been easily spoofed.

## It is just Prediction!

All stuffs from AI are the reflection of human world. It just generates next token based on probability, which is from our human data source. This process is sort of autocompletion.

Let's make some explaination:
```plaintext
system: you are an good person

user: hi? how is it going?
```

Given this context, the AI works like:
```plaintext
you are an good person, user: hi? how is it going? assistant: `M`
```
If most predictable token is "M", It emits "M". So it is useless to ask why next token is "M". AI just generates "M" token based on their studies.

## The reality of AI-generated code

AI-generated code is not fundamentally different from the previous example. Since generative AI is essentially an autocompletion tool that predicts the next token based on probabilities, it simply chooses “M” if “M” is the most prevalent token in the data it has seen.

This highlights the importance of having high-quality data sources. In the context of programming, the largest and most influential sources of code are platforms like Stack Overflow and GitHub, which contain vast amounts of open-source projects and community discussions.

However, the sheer quantity of code does not necessarily equate to quality. This is a critical insight—because as AI continues to generate more code, that code will inevitably be posted back onto platforms like GitHub and Stack Overflow. In turn, future AIs will be trained on this growing body of data, creating a feedback loop.

As a result, the volume of code in public repositories will likely increase exponentially over time, forming a kind of bad snowball effect in the evolution of AI-generated software.

As I mentioned, the quantity does not guarantee the quality. This means if code snowballed badly, mess and instability of software increases, which is not easy to fix as time goes. This misguidance must be stopped as soon as possible.

## Humans In Danger Zone.

Unfortunately, I believe the beginning of this problem has already started. Many so-called software engineers rely on AI-generated code without considering the software’s context or long-term maintainability. They seem to treat the output and explanation from AI as if it’s always correct, blindly copying and pasting without proper validation or contextual thinking.

In reality, AI-generated code is not necessarily the correct solution.

Let’s look at the following example:
```python
import asyncio
import aiohttp

urls = [
    "https://example.com",
    "https://python.org",
    "https://github.com"
]

async def fetch(session, url):
    async with session.get(url) as response:
        print(f"{url}: {response.status}")
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        await asyncio.gather(*tasks)

asyncio.run(main())
```
If you ask an AI something like:
“I want to efficiently handle multiple tasks with Python, ideally running them in parallel,”
it will likely produce a function like the one above.

However, several critical concerns need to be addressed in this kind of code:
1.	What if the function where you’re pasting this code is synchronous?
2.	What if the task involves modifying shared resources, not just handling immutable data like strings? This could lead to race conditions.
3.	What if, in the broader context of the application, such parallelism isn’t mission-critical or even necessary?

These are the kinds of questions that developers must ask themselves — but many don’t. I think this is not right.


## More AI Code, More Responsibility: Back to CS Basics

I fully acknowledge the benefits of AI. If there's unfamiliar domain, I actively use AI tool to learn and explore. This article doesn't assert that AI is evil. Rather, the problem arises when developers blindly copy and paste AI-generated code without understanding its context or verifying its correctness. That’s where the real danger lies. At the very least—test it. Ask AI follow-up questions like:
- “What are the side effects of this code?”
- “What happens if this runs inside a synchronous function?”
- “Is this thread-safe?”
- “Will this work in my environment or framework?”

But here's the catch. Without knowledge of something, you couldn't know sides effects from that something. The more we rely on AI to write code, the more essential it becomes to understand the core principles of Computer Science. Because we have to ask "precise and good" question to AI. Otherwise, we would recieve bad response.

> So yes, AI helps us move faster—but only if we know where we’re going.

Generative AI shifts the role of developers from “code writers” to “code reviewers and system thinkers.”
And to do that well, we must go back to the fundamentals:

- Operating systems
- Concurrency
- Memory management
- Software design patterns
- Network protocols
- Runtime behaviors

These aren’t “old-school” topics. They are now the foundation for using AI responsibly.
Mastering them is difficult — and often painful. But if we don’t want to be misled by AI, we must go back to the basics.