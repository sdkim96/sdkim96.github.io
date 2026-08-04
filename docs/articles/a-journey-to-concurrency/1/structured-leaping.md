---
title: Concurrency is structured leaping
sidebar_label: Concurrency is structured leaping
sidebar_position: 2
---

> Concurrency is structured leaping. Every leap must have an owner that outlives it — and the join point must be visible in the source.

## What the program really is

A program is basically a recipe for baking a bread. 

Here are two versions of recipes. 

### Recipe A (Structured)

| Order | Instruction |
|------:|-------------|
| 1 | Activate yeast |
| 2 | Prepare the dough |
| 3 | Let the dough rise |
| 4 | Bake the bread |
---

### Recipe B

| Order | Instruction |
|------:|-------------|
| 1 | Add water to the yeast |
| 2 | Add ... |
| 2 | If ... `goto Rise` |
| 3 | Bake |
| 4 | Prepare dough |
| 5 | `goto Bake` |
| 6 | Rise |
| 7 | `goto Prepare dough` |

Which one do you prefer? Both recipes have same complexity and time clock. We do prefer A to B for sure. As we are notoriously poor at visualizing processes evolving in time, we can't maintain our focus for entangled jumps. 
However, machines excels at interleaving multiple processes at one. They just execute the instructions by the speed of light.  

This recipe contains just a few lines of instructions, but we still want it to be shorter. Following this repetitive labor makes human boring and exhausted, under which we are always eager to find the coordinates and the north star not to be consumed. After we reach for the north star, we do not have to read that recipe every time we bake.

This is why we humans always abstract the program. Since our brains have evolved to discard unneeded details, we reconstruct the whole instructions into a few semantic chunks, by which it drops the cognitive loads incredibly. Meanwhile, the machine cannot understand those 'semantic chunks'. This gap forces developers to build and populate layers, which is why humans have continually invented ways to hide those low-level details. 

A good layer has clean and shaped interfaces. An interface is like a contract. The caller should keep its contract provided by the callee, which frees the caller from understanding the implementation details in return of compliance. 


## A program with concurrency 

A program with concurrency is like baking multiple recipes into a single dining. Let's say we have many visitors 

## Resolve the concurrency with good shapes