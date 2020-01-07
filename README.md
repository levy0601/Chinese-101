# mileStone2


#### Problem:
Language literacy is important in an increasingly globalized world. Many parents spend time and money on helping their kids grow up learning more than one language.

#### Proposed solution:
Children treat social robots more like social actors than passive (or even interactive) agents rendered on a screen. As a result, their brains work more similarly to when they are in the presence of social agents (i.e. when they are developing social skill and learning from other agents). Language learning is highly social and difficult to achieve just by reading books or completing worksheets. Robots can complement formal language learning to help kids learn practical conversation skills.

#### Prototype specifications: 
We will assume the robot teaches English to a child with different native language (e.g., Chinese, Spanish, Arabic). The robot will have different language exercises that the user can complete. These activities can be similar to those available on DuoLingo, but should give more emphasis on speaking and conversation skills.

#### Image processing capabilities for this robot (Milestone 1):

determine when a child is in front of the robot, 
determine if the child is engaged or not, 
determine if the person in front of the robot is an adult or a child, 
determine if the child is speaking or not, 
detect objects shown by the child to name them in the second language.
Interactive robot behaviors of this robot (Milestone 2):

#### Basic behaviors:

Walk the user through a vocabulary learning task using speech in both languages, similar to DuoLingo. The robot can say/display a word in the source language or show a picture, and ask the user a multiple choice question to choose its correct translation to the target language. The prompts can be in the source language (e.g. "What's this?" or "What is apple in Spanish?") while the words being learned should also be pronounced in the target language, for instance once the user selects the correct word. The task could also be translating from target language to source language or selecting the correct picture. 
Do speaking exercises where the user needs to say something in the target language (no need to determine if it was correct, just detect that something was said). This could be just repeating what the robot said in the target language for practice, or doing both translation and speaking (i.e. answering a vocabulary translation question with speech instead of multiple choice).

#### Behaviors that depend on image processing capabilities:

The lesson stops when the user disappears, resumes when they get back.
The robot names objects shown by the user or images on cards in the target language.


###### **_to run the program, run multiface_withFireBase1.py in mileStone1 to process image facial recognition in the backend_**