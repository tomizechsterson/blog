---
name: Turn-Based RPG
summary: A Godot project walkthrough that implements a pretty feature-rich turn-based RPG
cardImg: '/static/images/project-cards/godot_logo_turn_based_rpg.png'
cardSortOrder: 7
date: '2023-09-18T19:40:00Z'
lastMod: '2023-09-18T19:40:00Z'
initialDemo: '/static/games/turn-based-rpg-initial/TurnBasedCourse.html'
images:
  [
    '/static/images/screenshots/turn-based-rpg/town.png',
    '/static/images/screenshots/turn-based-rpg/dialog.png',
    '/static/images/screenshots/turn-based-rpg/battle.png'
  ]
notes: ['Keyboard required']
---

This is a turn-based RPG created from this [Godot tutorial][1]. The link above the screenshots will take you to the demo
if you'd like to check it out.

The game has about 5 - 7 minutes of gameplay, but showcases pretty much every major system that a game like this would
have, even if they are super basic. This includes:

- Dialog
- Simple quest system
- Inventory
- Screen transitions
- Interacting with objects
- Random, side view battle system
- Basic spell effects
- Sound and music
- Saving/loading

NOTE: Saving/loading doesn't currently appear to work in the browser

The controls are as follows:

Over-world:

- Press arrow keys to move
- Press 'Enter' or 'Space' to interact with objects
- Press 'Esc' to open up the menu

Menu/Battle:

- Press arrow keys to select an option
- Press 'Enter' or 'Space' to confirm selection
- Press 'Esc' to close the menu (Or select the Close option)
  - If in battle, this will not exit. You must select the Run command to exit battle early.

[1]: https://courses.heartgamedev.com/p/turn-based-course
