## Tic Tac Toe Game Design

This document outlines the design system for the TicTacToe game. They aim to create a visually appealing and user-friendly interface for the game

## Selector 

- **selector:** * selector applies a margin of 0 and padding of 5px to all elements to ensure consistent spacing

## Fonts

- **Primary Font**:
  - **Description**: Main font used throughout the game, applied to the `body`, and text elements
  - **Value**: `"Permanent Marker", cursive`

## Colors

- **Primary Color**: 
  - **Description**: For the background gradient
  - **Value**: `linear-gradient(90deg, rgb(17, 51, 161) 0%, rgb(136, 34, 195) 100%)`

- **Text Color**:
  - **Description**: Primary color used for the text
  - **Value**: `rgb(234, 245, 171)`

- **Cell Button Background Color**:
  - **Description**: Background color for the dice buttons
  - **Value**: `#fbfbfb`

- **Cell Button Text Color**:
  - **Description**: Text color for the dice buttons
  - **Value**: `#000000`

- **Reset Button Background Color**:
  - **Description**: Background color for the reset button
  - **Value**: `rgb(255, 238, 5)`

- **Play Again Button Background Color**:
  - **Description**: Background color for the play again button
  - **Value**: `rgb(5, 255, 172)`

- **Modal Content Text Color**:
  - **Description**: Text color for the winner text in the modal
  - **Value**: `#f8f8f8`

## Layout

- **Body Layout**:
  - **Description**: Styles for the body to center content
  - **Styles**:
    ```css
    body {
      background: linear-gradient(90deg, rgb(17, 51, 161) 0%, rgb(136, 34, 195) 100%);
      text-align: center;
      display: flex;
      justify-content: center;
      font-family: "Permanent Marker", cursive;
      color: rgb(234, 245, 171);
      font-size: large;
    }
    ```

- **Game Container**:
  - **Description**: Container for the content of the game
  - **Styles**:
    ```css
    .gameContainer {
      height: 70vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ```

- **Cell**:
  - **Description**: Grid container for dice
  - **Styles**:
    ```css
    .cell {
      height: 60vmin;
      width: 60vmin;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1.5vmin;
    }
    ```

## Buttons

- **Cell Button**:
  - **Description**: Styles for dice buttons
  - **Styles**:
    ```css
    .cellButton {
      height: 18vmin;
      width: 18vmin;
      border-radius: 1rem;
      border: none;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
      font-size: 8vmin;
      cursor: pointer;
      font-family: "Permanent Marker", cursive;
      background-color: #fbfbfb;
      color: #000000;
    }
    ```

- **Reset Button**:
  - **Description**: Styles for the reset button
  - **Styles**:
    ```css
    #resetBtn {
      padding: 1rem;
      font-size: 1.25rem;
      background-color: rgb(255, 238, 5);
      color: #000000;
      border-radius: 1rem;
      border: none;
    }
    ```

- **Play Again Button**:
  - **Description**: Styles for the play again button
  - **Styles**:
    ```css
    #playAgainBtn {
      padding: 1rem;
      font-size: 1.1rem;
      background-color: rgb(5, 255, 172);
      color: #000000;
      border-radius: 1rem;
      border: none;
    }
    ```

- **How to Play Button**:
  - **Description**: Styles for the how to play button. It specifies the rules of the game.
  - **Styles**:
    ```css
    #howtoplayBtn {
      padding: 1rem;
      font-size: 1.1rem;
      background-color: rgb(5, 255, 172);
      color: #000000;
      border-radius: 1rem;
      border: none;
    }
    ```

## Miscellaneous

- **Modal Content**:
  - **Description**: Styles for the tile map of the game.
  - **Styles**:
    ```css
    .modalContent {
      height: 100vmin;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 4rem;
    }
    ```

- **Winner Text**:
  - **Description**: Styles for the text for the winner of the game
  - **Styles**:
    ```css
    #winnerText {
      font-size: 2rem;
      font-family: "Permanent Marker", cursive;
      color: #f8f8f8;
    }
    ```

- **Hide Class**:
  - **Description**: Class for hiding the winner of the game
  - **Styles**:
    ```css
    .hide {
      display: none;
    }
    ```

