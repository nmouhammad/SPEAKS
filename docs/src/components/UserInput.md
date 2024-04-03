# UserInput

## Props

| Prop name    | Description                                                                                             | Type    | Values | Default |
| ------------ | ------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| chapterID    | The ID of the chapter of this block.                                                                    | number  | -      |         |
| heading      | The heading that should be shown on top of this block                                                   | string  | -      |         |
| buttonText   | The text of the button the user should click when they are done with the<br/>task in this block.        | string  | -      | ''      |
| customButton | Whether a custom button is added inside the slot instead of using the<br/>standard button of UserInput. | boolean | -      | false   |

## Slots

| Name    | Description                                                                                                                                                                  | Bindings |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| default | The user input to display (between the heading and the (optional) button). If customButton is true, this slot should trigger stopWaiting when the next step should be shown. |          |

---
