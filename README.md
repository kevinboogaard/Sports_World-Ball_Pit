## WARNING: DOCUMENTATION
We haven't generated any documentation yet. That is because we can't find any documentation generators. We will try to do this for sprint 2. For now- to prove that we can document our code, we've in our readme and example of one documentated class.

But please know that all of our classes are commented and thus serves as 'documented code'?

## Sports World: Ball Pit

Introduction to the github.
>>>>>>> development

## Sports World: Ball Pit

Sports World; Ball Pit is a puzzle game made for Cool Games. This project is for the 'Proeve van Bekwaamheid' of Mediacollege Amsterdam. This game is being developed by: Alex Antonides, Jennifer Versteeg, Frederiqué Gesbert, Kevin Boogaard, Lorenzo Koning, Sabrina Rahali El Bairi and Susan van der Puijl.

### Code Documentation

In this README file you can find the documentation for the code of Sports World: Ball Pit. The documentation location will change later once we have found a Javascript documentation generator that works with out code. Since we have a lot of code we will only document the most important classes in our code. 


## Sprite

```markdown
new ADCore.Sprite(vector,key)

The Sprite class is the most basic view in the framework. It is extended by Display and Interface. This class handles the key-to-information in its private functions.

# Parameters
- position
- key


# Public Properties
- boolean: disposed

## Disposed: boolean
Disposed is a variable that turns true if the sprite has been disposed.


# Public Methods
- Play 
- Dispose

## Play(name, framerate, loop) -> {Phaser.Animation}
The animation matching the name will play when calling this method. 

### Parameters
- string: Name [The name matching the animation in the json file]
- int: Framerate [The framerate that the animation will play at]
- boolean: Loop [If true, the animation will loop]

### Returns
Phaser.Animation- 
The Animation instance. 

## Dispose()
Disposes the Sprite
```
