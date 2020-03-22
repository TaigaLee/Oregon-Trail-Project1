Game idea:
Create a mini version of the classic game Oregon Trail where the player embarks on a trip to Oregon. Along the way the player is met with decisions that will affect their progress and are tasked with the responsibilities of making sure they don’t run out of food and stay healthy.

User story:

Player starts at max stats (80 food, 100 hp, 100 wagon HP, and \$35) and at the beginning of the map. They have the option of whether to run, walk normally, or walk slowly. Dependent on each choice they will lose stamina more or less quickly. They will auto walk without requiring key input.

Players will lose food, wagon hp, and stamina as time goes on.

Players will be tasked with selecting yes or no on random interactions such as “open the random box?” or “how do you want to cross the river?” Decisions made will impact game.

Players will eventually have a mini hunting game pop up to get more food. If they click the rabbit on time they will gain food. Runs 6 times.

When player reaches the town checkpoint they have the chance to stock up on food in the general store and make money by staying additional days (which increases the chance that they won’t make it to Oregon by winter which = death).

User can die of illness, starvation, or if the game hits winter.

The user will win the game after traveling 75 miles before winter comes in 10 days.

Approaches taken:

The entire game is written in jQuery, vanilla JS, HTML, and CSS. I did not use a JS library to animate, instead I used jQuery's animation features.

Problems:

I need to figure out how to have the pictures stack relatively without me hard coding the pxs as that will change depending on how big the user's screen is.

Code is very long, need to make more DRY and less redundant.

Forthcoming features:
Make the game longer, add more interactions, make the store have the images of what people are buying.

Wireframe:

General layout of the game -
![first wireframe board](https://i.imgur.com/D8Wpuyk.jpg)

Random popup interactions -
![second wireframe board](https://i.imgur.com/j2aVavs.jpg)

Can buy things from stores when player hits towns -
![third wireframe board](https://i.imgur.com/H0RBNPP.jpg)

Player dies if they can't reach it to the Oregon Trail on time, run out of food, or die of illness -
![fourth wireframe board](https://i.imgur.com/zupRJcM.jpg)
