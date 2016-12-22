Beauty salon
======

The game was created for those people who have always wanted to feel as a manager for the beauty salon. In my implementation is necessary to ensure that every visitor to receive their services as soon as possible and left in a good mood.

**Goal of the game:**
To have time to move the visitors to the place of treatment.

The main elements of gameplay:
----

**Visitors**

Visitors - is the main element of the game. Actually it depends on the result of the visitors and getting points. The manager gets a good point when he could drag the user to the procedure (see para. "Procedures"). Otherwise, the user goes in a bad mood, and the player gets a bad point.

Throughout the game, the visitor mood is constantly changing. As soon as he walked over to the couch waiting (see para. "Sofa waiting"), it begins to change for the worse. For 10 seconds, the user will be completely dissatisfied and go home. During this time, the player needs to have time to move the user to the procedure. 

If the player has managed to move the user to the procedure, his mood as continuously starts to change, but for the better, and starting with the mood, with whom he had come to the procedure. Once the mood to reach the best, the visitor will go home.

**Procedures.**

Below the scene are arranged procedure. This implementation is available three procedures: make-up table, a massage table and one make-up table. Select desired procedure produces a "manager", that is, the player himself.
After the selection process, the manager must win any visitor to the free procedure. As soon as he put it, the visitor immediately starts to rise up. When a customer is ready to leave home, he would be blue, after he had gone, the player receives one positive point.
Next it shows how changing user mood from bad to good in the process. In the end he becomes blue and goes home in a good mood.

**Sofa waiting:**

    Sofa waiting is required in order to allow visitors expected on it for their turn until the manager is not will draw them to the procedure. It is located at the top of the screen. When a new visitor arrives, he first goes to the couch and stay there as long as the user does not take it from there. When the user has just come to the couch, it will be green, that is, he will have a good mood. The longer he'll be on the couch, the faster it will spoil the mood, and the sooner he goes home.
 
**Score:**

  Score shows the number of satisfied and dissatisfied customers. For a satisfied visitor you get positive points for dissatisfied negative respectively. Positive points the player receives, if the visitor just passed the procedure, and negative if the manager did not have time to transfer the visitor to the procedure, and he went home.

Example
-------

![demo](demo.gif)