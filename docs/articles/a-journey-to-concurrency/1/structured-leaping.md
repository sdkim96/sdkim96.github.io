---
title: Concurrency is structured leaping
sidebar_label: Concurrency is structured leaping
sidebar_position: 2
---

> Concurrency is structured leaping. Every leap must have an owner that outlives it. 

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
| 1 | Activate yeast |
| 2 | `goto Rise` |
| 3 | Bake |
| 4 | Prepare dough |
| 5 | `goto Bake` |
| 6 | Rise |
| 7 | `goto Prepare dough` |

Which one do you prefer? Both recipes have same complexity and time clock. We do prefer A to B for sure. As we are notoriously poor at visualizing processes evolving in time, we can't maintain our focus for entangled jumps. 
However, machines are distinguished experts for interleaving multiple processes at one. They just execute the instructions by the speed of light. 

This recipe contains just a few lines of instructions, but we still want it to be shorter. Following this repetitive labor makes human boring and exhausted, under which we are always eager to find the coordinates and the north star not to be consumed. After we reach for the north star, we do not have to read that recipe every time we bake. However, machine always read the instructions.