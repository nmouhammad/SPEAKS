# ChaptersViewer

## Props

| Prop name | Description                                                             | Type  | Values | Default |
| --------- | ----------------------------------------------------------------------- | ----- | ------ | ------- |
| content   | collection of content objects that should be displayed after each other | array | -      | [[]]    |

## Methods

### keydownEvent

> check whether a key is pressed and if yes trigger the corresponding event

#### Params

| Param name | Type | Description |
| ---------- | ---- | ----------- |
| event      |      |             |

### next

> uncover the next text or change the chapter if all texts for this
> chapter are already uncovered

### previous

> go one step back by either removing the current text or change the chapter
> if all texts for this chapter have already been removed

### startWaiting

> start to wait for user input (= deactivate going next)

### stopWaitingGoNext

> the user input we were waiting for has been arrived, we can now stop
> waiting for it and go to the next step

---
