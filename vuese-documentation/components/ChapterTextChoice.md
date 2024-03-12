# ChapterTextChoice

One of the chapters that can be used in the ChaptersViewer, contains text on top, then multiple buttons from which the user can choose and then sees the corresponding description with the option to either revert their choice by clicking on another button or choosing to go with that choice by clicking the "submit"-button (with custom text) on the bottom. To see an example how the elements should be formatted, look at IntroductionView.vue.

## Props

<!-- @vuese:ChapterTextChoice:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|elements|all elements that should be displayed in this chapter|`Array`|`true`|-|
|currentElementID|the id of the last subtext that should be visible|`Number`|`true`|-|

<!-- @vuese:ChapterTextChoice:props:end -->


## Events

<!-- @vuese:ChapterTextChoice:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|wait|-|-|

<!-- @vuese:ChapterTextChoice:events:end -->


