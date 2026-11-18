# Motion

Motion explains change; it never decorates. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- Purpose and duration
- Easing
- Reduced motion
- Delays are not motion
- Review checks

## Purpose and duration

- Animate only to show where something came from, went to, or changed. [NN/g animation duration; Material easing and duration]
- Durations: about 100 ms for simple feedback (checkbox, toggle), up to about 500 ms for large or far-travelling moves (panels, dialogs). Most animations fall in 100–500 ms; longer feels slow. [NN/g animation duration; Material easing and duration]
- Exits slightly faster than entrances.

## Easing

- Ease-out for things entering, ease-in for things leaving, standard ease for moves on screen. Avoid linear for movement. [Material easing and duration; Carbon motion]
- Keep a small set of named durations and easings as tokens.

## Reduced motion

- Honour `prefers-reduced-motion: reduce`: remove or replace movement (slides, zooms, parallax) with a fade or an instant change. [MDN prefers-reduced-motion; WCAG 2.3.3 (AAA)]
- Keep feedback: an instant state change still tells the user something happened.

## Delays are not motion

- Delays (hover intent before a menu opens, a short wait before showing a loading indicator) are timing, not movement. Reduced motion removes movement, not delays. [MDN prefers-reduced-motion; `[reasoned]`]
- Hover-intent delays (about 0.3–0.5 s of resting pointer) prevent menus and tooltips from opening when the pointer only passes over them. [NN/g timing of exposing content; NN/g mega menus]
- Loading indicators: none for responses under about 1s, an indicator after that, progress for long waits. [NN/g response time limits]

## Review checks

- Does every animation explain a change?
- Durations and easings from tokens, within the typical ranges?
- Does reduced motion remove movement and keep delays and feedback?
