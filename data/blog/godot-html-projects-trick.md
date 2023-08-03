---
title: Godot v3.5.x HTML5 Exports Can Share Engine Assemblies
date: '2023-08-02T19:41:07Z'
tags:
  [
    'godot',
    '3.5.x',
    'html5',
    'export',
    'til',
    'today-i-learned',
    'share',
    'engine',
    'assembly',
    'binary',
    'wasm'
  ]
summary: Today I discovered a neat little trick involving Godot HTML 5 exports and their generated files
layout: PostLayoutReduced
canonicalUrl:
---

When making games with the Godot engine, it can be exciting to be able to create a version of your project that can be
played using a simple browser. It makes showing your game off to friends and family so easy when you can just say "Hey,
go to this URL and check out my work!". Then, you update the project, copy/paste the new exported files, redeploy your
site, and start the process all over again. What happens when you have more than one project, though...?

In order to care about this, it's important to note that each Godot project, when exported for HTML5, will produce a
15-20mb file, which represents the engine binary, and another file that can vary in size in megabytes[^1], that
represents your actual game, among other files to make it work via the web. I'm pretty sure most (if not all) code
repository hosting sites have an upper limit on how large your repo can be. For example, GitHub has a max of 1gb for
Git LFS Data, across all repos on your account. That may seem like a lot, but it can add up if you're really getting
into this Godot stuff and putting out game after game. Surely, there must be a more efficient way to do this,
especially since each of your projects should be using the same engine (unless you change versions, of course, but
even then, you shouldn't be using more versions of your engine than projects).

Well, it just so happens that today I learned that you can actually finagle a more efficient way of organizing these
files. You can set it up so that your HTML5-exported game uses a communal engine web assembly file that all projects
built with the same version of the engine can use. Then, you can deploy that engine binary one folder up from your
game(s), and only copy over the files for the project itself (and the files related to the generated web page[^2]).
Here's how[^3] [^4]:

When Godot exports a project for HTML5, it will produce (among other things), an HTML and JS file, both named after your
project: `ProjectName.html` and `ProjectName.js`. These files are pretty much where all the magic happens to get the
browser to play your game. Thankfully, you should only have to edit the .html file.

Somewhere around line 142, you should see something like this (I've seen this with v3.5.1 and 3.5.2 of the engine, so
if you're on a different version, the line might vary, but hopefully it's close enough):

```javascript:ProjectName.html
const GODOT_CONFIG = {
  "args": [],
  "canvasResizePolicy": 2,
  "executable": "ProjectName",
  "experimentalVK": false,
  "fileSizes": {"ProjectName.pck": 5226624, "ProjectName.wasm": 18790437},
  "focusCanvas": true,
  "gdnativeLibs": []
}; // The export generates this on one line. You're welcome :)
```

Also in the .html file, you should see something like this way down near the bottom, somewhere around line 224:

```javascript:ProjectName.html
engine.startGame({
    'onProgress': function (current, total) {
        if (total > 0) {
            statusProgressInner.style.width = current/total * 100 + '%';
            setStatusMode('progress');
            if (current === total) {
                // wait for progress bar animation
                setTimeout(() => {
                    setStatusMode('indeterminate');
                }, 500);
            }
        } else {
            setStatusMode('indeterminate');
        }
    },
}).then(() => {
    setStatusMode('hidden');
    initializing = false;
}, displayFailureNotice);
```

That call above to `startGame()` sends the program into the 18,000+ line .js file, where you can see exactly how the
engine is started and the game is loaded. Luckily for you, I've already done the research in there to figure out what
you need to do[^5].

To specify the file to load for the engine, you can add more properties to the object sent to `startGame()` above, which
only has `onProgress` by default. Doing this will result in something like this:

```javascript:ProjectName.html {5-6}
engine.startGame({
    'onProgress': function (current, total) {
        // ...
    },
    'executable': '../engineWasm',
    'mainPack': 'ProjectName.pck'
}).then(() => {
    setStatusMode('hidden');
    initializing = false;
}, displayFailureNotice);
```

Notice the `executable` and `mainPack` that have been added. The `executable` property is the path to the engine
assembly you want to use. Keep in mind that this path is relative to the .html file that you're modifying. Doing this
makes it so that you have to specify the .pck file as well, which is why we have to also add `mainPack` here, which
works similarly to the `executable` property.

Now, doing this is going to make the `GODOT_CONFIG` variable we saw earlier not work anymore. This is because the
`fileSizes` property here needs to match the file that you passed in for `executable`. This means that it should look
like this after updating the call to `startGame()`:

```javascript:ProjectName.html {6}
const GODOT_CONFIG = {
  "args": [],
  "canvasResizePolicy": 2,
  "executable": "ProjectName",
  "experimentalVK": false,
  "fileSizes": {"ProjectName.pck": 5226624, "../engineWasm.wasm": 18790437},
  "focusCanvas": true,                    // ^^^^^^^^^^^^^^^^^^
  "gdnativeLibs": []
};
```

Yes, it does look kind of funny to those of you familiar with JavaScript, but this is just how the .js file is written.
It's dependent on the path used to locate the engine binary for looking up this particular value in the `fileSizes`
object. Now, you might be wondering why this second bit is such a big deal...

It turns out that if you don't update the `GODOT_CONFIG`, the progress bar that's displayed while downloading the engine
will no longer work, and instead just display a standard loading spinner. If you don't care about this, then you
shouldn't need to update `GODOT_CONFIG`, and it should still download fine and start the game.

Now, you can deploy as many games as you want that all use the same version of the engine, and they can all point to a
single web assembly file on the server. As an example, this very site has a few, and as of this writing the files and
folders look like this:

```
static
├── favicons
│   ...
├── games
│     ├── air-combat
│     │     └── Godot export-generated files (sans engine!)
│     ├── asteroids
│     │     └── Godot export-generated files (sans engine!)
│     ├── circle-jump
│     │     └── Godot export-generated files (sans engine!)
│     ├── engine351.wasm
│     ├── engine352.wasm
│     ├── retro-platformer
│     │     └── Godot export-generated files (sans engine!)
│     └── topdown-shooter
│           └── Godot export-generated files (sans engine!)
└── images
    ...
```

Notice there's only 2 engine assemblies for 5 games. This means that I should effectively never
hit the max size for my repos, even if I keep churning out tutorial projects (and/or maybe actual projects someday...?).
All I have to do is add another folder, copy over the newly-exported files created via Godot's Export dialog (except for
the engine .wasm file), tweak the html as above, and the game should work, all without eating up another 15-20mb of
space on this blog's repo.

Or... You could just deploy your games to Steam, itch.io, or GameJolt. Your choice; I just like to make things more
difficult for myself. 😅

[^1]:
    Somehow, [one of mine](/projects/godot-retro-platformer) is only 92kb... I have no idea why that is, and I find
    it rather surprising (maybe even ever so slightly upsetting), but hey, at least it works.

[^2]:
    I assume that it might even be possible to move the audio.worklet.js file up too, since it's pretty much always
    the same, but I wouldn't bother. Since it's less than 10kb, it'd be way more of a hassle than it's worth.

[^3]:
    Keep in mind that I have no idea if this just might break something deep in the bowels of Godot or the generated
    Javascript file and cause havoc in some untold and/or unpredictable places in fun and/or exciting ways... I didn't do
    _that_ much research here (I mean come on, I actually want to make games here, not putz around in JS land all day). All I
    can say is that it _seems_ to be working for me, at least for now, and I'm happy with this solution. Until and if something
    goes haywire. Then I won't be so happy; and you'll probably see a follow-up post to this one explaining how foolish I was
    for falling into this trap and letting my guard down. I really like these footnotes.

[^4]: All that to say, at the end of the day the general rule of thumb is: Modify auto-generated files at your own risk.
[^5]:
    For the curious, you'll want to start way down somewhere around line 18,595 with the `startGame: function (override)`
    line. Notice the line `const exe = this.config.executable` just a couple lines down. This is where I had my "Aha!"
    moment. This revealed to me (on a bit of a leap of faith; I'm not a JS expert) that I can pass in these properties and
    change how the .js file loads up the engine. Now, we can follow that to the `init` function somewhere around line 18,464,
    within the `function SafeEngine(initConfig)` object. Here, you can see the `Engine.load()` call, where the path to the
    engine assembly and its file size are passed in. This is defined somewhere around line 18,414, where we call `loadPromise()`
    with these arguments, and actually fetch the file. Studying these steps was what led me to finally put the pieces together
    and come up with a theory.
