---
type: post
title: Fifth post
author: CUSTOM AUTHOR NAME
date: 2023-02-17
tags: []
intro: |
 This is the fifth post showcasing math rendering
---

# Math rendering

This post showcases math rendering using [KaTeX](https://katex.org/) in
[deno-gfm](https://github.com/denoland/deno-gfm)

## Inline math

Inline math is rendered using `$` delimiters, e.g. `$\sqrt{3x-1}+(1+x)^2$`
renders as $\sqrt{3x-1}+(1+x)^2$ .

And the letter `i` is rendered as $i$.

## Block math

Block math is rendered using `$$` delimiters, e.g. `$$\sqrt{3x-1}+(1+x)^2$$`
renders as

$$ \sqrt{3x-1}+(1+x)^2 $$

## Math in code blocks

Math can be rendered in code blocks by using the `math` language tag, e.g.
`math \sqrt{3x-1}+(1+x)^2` renders as

<!-- $i$ -->
