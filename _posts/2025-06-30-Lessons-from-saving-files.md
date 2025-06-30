---
layout: post
title: "Lessons from saving bunch of files"
date:   2025-06-29 17:51:00 +0900
categories: [blog, GitHub]
---

## 

I wrote a data pipeline code which contanins 3 steps: fetching original data from korean law API center, spliting into chunks, loading to vectorstore and RDB. It was successfully tested and built, which means errors were fully handled, bugs were captured before deployed. There were no logical flaws in this code. Deployed to production server, this code successfully had been started and continued until the unexpectable disaster happened. 

In this pipeline, python writes a bunch of json files within the `for` loop, dumping into the point where ext4 file system mounted on. During this process, about 20% left from fully dumped, os system makes an error call that there were no left inodes in mounted file system. This means the remaining process was broken totally, simply meaningless to progress.

Beyond the broken data pipeline, I suddenly realized this is severe problem that could invoke enormous effects on other processes using mounted file system. I killed the process patiently and removed files from my folders. After that, I modified the logic from dumping files to load RDB directly. 

This dangerous episode could be encoutered from various sources, especially when project uses their own on-premise file server, and could be driven both lack of capacity and writter's carelessness. 

## What's the serious point?

Many readers might not know about `Inodes`, the key topic in this episode. `Inode` is a metadata from a file in Unix or Linux file system. There would be only one `Inode` per a file. So that, We can't write limitless files in file system. If a file system formatted, max counts of inodes was decided by the full capacity of that file system.