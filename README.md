# Space Invaders

Overview

Target audience
Why this website is useful

![Responsive Mockup](documentation/testing/responsive-mockup.png)

***

## User Stories

As a user of the Space Invader game, I want to:
  1. have fun playing the game
  2. have easy to use controls to play the game with
  3. visit a retro looking game for an enjoyable/nostalgic experience
  4. navigate through the website and game easily and fluidly
  5. access instructions on how to play the game and game aims
  6. see a scoreboard of local highscores

***

## UX

### Colour Scheme
- A simple, dark space-like black and contrasting white with some purple, yellow and blue elements for a pop of colour. This colour palette aims to give a classic retro feel.
    >![colour palette](documentation/testing/color-palette.png)
- No accessibility issues were returned when passing the colour scheme through the official [WebAIM](https://webaim.org/resources/contrastchecker/)
    >![webaim screenshot](documentation/testing/webaim-screenshot.png)

### Typography

- Google Fonts
  Font styles were taken from the open source [Google Fonts](https://fonts.google.com/).
  - The typography for Space Invaders logo is font-family [Press+Start+2P](https://fonts.google.com/specimen/Press+Start+2P). This font design is based on the font designs from 1980s Namco arcade games. This gives the logo a classic retro gaming feel which is what I aimed to acheive with space invaders.
  - The typography for the heading elements within the website is font-family [Bungee](https://fonts.google.com/specimen/Bungee). This font design shares characteristics of the Press+Start+2P design giving the website a hollistic design. This font is a more readable but still gameified design. The weight and capitilization of the font makes it a great choice for eyecatching headings.
  - The typography for other text on the website is font-family [Coda](https://fonts.google.com/specimen/Coda). This font design is clean, unassuming and practical. The style merges well with the Bungee font-family and has a less impactful presence on the screen.

***

### Wireframes

- Welcome wireframe in desktop view

 ![welcome page wireframe](documentation/wireframes/space-invaders-welcome-screen-website-wireframe.png)

- Instructions wireframe in desktop view

 ![instructions wireframe](documentation/wireframes/space-invaders-instructions-screen-website-wireframe.png)

- Scoreboard wireframe in desktop view

 ![scoreboard wireframe](documentation/wireframes/space-invaders-scoreboard-screen-website-wireframe.png)

- Gameplay wireframe in desktop view

 ![desktop gameplay wireframe](documentation/wireframes/space-invaders-gameplay-website-wireframe.png)

- Gameplay wireframe in mobile view

 ![mobile gameplay wireframe](documentation/wireframes/space-invaders-gameplay-mobile-wireframe.png)

***

## Features 

### Existing Features 

- __Home Menu__

  - The home menu modal loads when the window loads. It overlays the game area. The home menu has three buttons: the start button, the instructions button, and the scoreboard button.
  - The home menu allows the user to navigate around the modals and/or start gameplay. Clicking the start button will close the modal and begin gameplay. Clicking the instructions button will close the home menu modal and reveal the instructions modal. Clicking the scoreboard button will close the home menu modal and reveal the scoreboard modal.

    >![Home Menu](documentation/testing/home-menu-screenshot.png)

- __Instructions__

  - The instructions modal loads when the instructions button on the home modal is clicked. The instructions overlay the game area. The instructions modal has scrollable text and a back button.
  - The instuctions modal content holds instructions and controls on how to play space invaders, wether on a keyboard or touchscreen device. The text is written as if it is an incomming message to the spaceship (the ship represents the player in the game), this allows some pre-text to the game to be established and gives a more immersive experience. The back button allows users to navigate back to the home menu - the back button closes the instructions modal and loads the home menu modal.

    >![Instructions](documentation/testing/instructions-screenshot.png)

- __Scoreboard__

  - The scoreboard modal loads when the scoreboard button on the home modal is clicked. The scoreboard overlay the game area. If there is no cache in local storage of previous gameplay (i.e., if it is the first time playing the game) the scoreboard will display text indicating that there are no highscores (see below screenshot). If there is local storage of previous scores a list will show the top 10 highscores for the game (see below screenshot). The scoreboard also has a back button.
  - The scoreboard allows users to keep a record of previous highscores on that device. This adds a competitive element to the game, aiming to get a higher and higher highscore. The back button allows users to navigate back to the home menu - the back button closes the scoreboard modal and loads the home menu modal.

    >![Scoreboard](documentation/testing/scoreboard-screenshot.png)
    >![Empty Scoreboard](documentation/testing/empty-scoreboard-screenshot.png)

- __The Game__

  - The game is space invaders and is the main content of the website. The player in this game is a spaceship which can move on a horizontal axis at a limited velocity. The aim of the game is to clear the game area of alien enemies (which shoot directly towards the player and also move on a horizontal axis). The player must dodge oncoming fire to survive. The player can return fire to destroy enemy aliens. UFOs will occasionally fly abouve, these hostiles have a higher rate of fire and their fire has a higher velocity (aka harder to dodge). The game gets progressivley more difficult with time as the velocity of enemy alien fire increases with every shot that the aliens take.
  - The purpose of the game is to entertain.

    >![Gameplay](documentation/testing/gameplay-screenshot.png)

- __Score Counter__

  - The score counter displays the users current score.

    >![Score Counter](documentation/testing/score-counter-screenshot.png)

- __Lives Counter__

  - The lives counter displays the users current lives. Once the counter hits 0 it's game over.

    >![Lives Counter](documentation/testing/lives-counter-screenshot.png)

### Features Left to Implement 

- Online scoreboard
  - Description of feature
  - Why this feature is neccessary
  - Why this feature hasn't yet been implimented

- Improved accessibility for mobile gaming
  - Description of feature
  - Why this feature is neccessary
  - Why this feature hasn't yet been implimented

***

## Technologies
- [HTML](https://en.wikipedia.org/wiki/HTML) was used as the markup language
- [CSS](https://en.wikipedia.org/wiki/CSS) was used for styles
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) was used for website interactivity
- [GitPod](https://gitpod.io) was used as a cloud based iDE
- [GitHub](https://github.com/) was used to manage the Git repository
- [GitHub Pages](https://antonia-white.github.io/space-invaders/) was used for deployment
- [Git](https://git-scm.com/) was used for version control
- [Am I Responsive](http://ami.responsivedesign.is/) was used to generate a mockup image
- [Phaser 3 API](https://photonstorm.github.io/phaser3-docs/) was used for game development
- [Dev Tools](https://en.wikipedia.org/wiki/Web_development_tools) was used for testing and responsiveness
- [iloveimg](https://www.iloveimg.com/) was used for resizing and cropping svg images

***

## Testing

To view all testing documentation, refer to [TESTING.md](TESTING.md).

***

## Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the [GitHub repository](https://github.com/antonia-white/space-invaders), navigate to the Settings tab.
  - From the source section drop-down menu, select the **Main** Branch, then click "Save".
  - The page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://antonia-white.github.io/space-invaders/).

### Local Deployment

In order to make a local copy of this project, you can clone it. In your IDE Terminal, type the following command to clone the repository:

- `git clone https://github.com/antonia-white/space-invaders.git`

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/antonia-white/space-invaders)

***

## Credits 

### Content 

- All text throughout the website is self-written

### Media

- Wireframes were generated with [Draw.io](https://app.diagrams.net/)
- The favicon image is from the open source site [Favicon.io](https://favicon.io/emoji-favicons/herb)
- The responsive design mockup was generated with [Am I Responsive Design](http://ami.responsivedesign.is/#)
- The colour palette was generated with [Color Combos](https://www.colorcombos.com/)
- SVG files were taken from the open source site [SVG Repo](https://www.svgrepo.com/)
- SVG files were resized with [iloveimg](https://www.iloveimg.com/)

***
