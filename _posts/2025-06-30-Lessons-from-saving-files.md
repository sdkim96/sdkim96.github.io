---
layout: post
title: "Lessons from saving bunch of files"
date:   2025-06-29 17:51:00 +0900
categories: [blog, GitHub]
---

## 

I have worked in projects which

I wrote a data pipeline code which contanins 3 steps: fetching original data from korean law API center, spliting into chunks, loading to vectorstore and RDB. It was successfully tested and built, which means errors were fully handled, bugs were captured before deployed. There were no logical errors in this code. Deployed to production server, this code successfully had started and continued until the unexpectable disaster happened. 

In this pipeline, python dumps a bunch of json files within the `for` loop, into the point where ext4 file system mounted on. During this process, about 20% left from fully dumped, os system makes an error call that There is no left Inodes in file system. This means the remaining process was broken totally, simply meaningless to progress.

Beyond the broken data pipeline, I suddenly realized this is severe problem that could invoke an enormous effect on other processes using mounted file system. I killed the process, and removed files from my dumping point. After that, I modified the code from dumping files to load RDB directly. 

This dangerous episode could be encoutered from various sources, especially when project uses their own on-premise file server, which could be driven both lack of capacity and writter's carelessness. 