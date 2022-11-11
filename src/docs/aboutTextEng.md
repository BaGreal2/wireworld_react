# A bit of theory :)

## What is Wireworld?

Wireworld is a cellular automaton[^first] first proposed by Canadian scientist Brian Silverman in 1987. The special feature of this cellular automaton is that it's designed to simulate logic elements or "gates", making it Turing-complete[^second]. Turing completeness itself is not a feature of this cellular automaton, its uniqueness lies in the fact that in this cellular automaton logic structure is built more easily than in others, and therefore it is not a "swamp" and anyone with certain skills can build some sort of computational mechanism in it.

## Rules

As every cellular automata, Wireworld works according to certain simple rules. In total, there are 4 types of cells, for which the same rules are applied at each iteration:

1. Empty -> Empty
2. Electron head -> Electron tail
3. Electron tail -> Conductor
4. Conductor -> Electron head, if exactly one or two of the neighbouring cells[^third] are electron heads, otherwise remains conductor.

Although the rules are simple, they can lead to interesting behavior:

![XOR](https://upload.wikimedia.org/wikipedia/commons/1/13/Wireworld_XOR-gate.gif)

<figcaption>2 clock generators sending electrons into an XOR gate</figcaption>

![DIOD](https://upload.wikimedia.org/wikipedia/commons/1/15/Wireworld_two-diodes.gif)

<figcaption>2 diodes, the above one in conduction direction, the lower one in reverse-biasing</figcaption>

![DISPLAY](https://upload.wikimedia.org/wikipedia/commons/5/5d/Animated_display.gif)

<figcaption>Example of a complicated circuit made in WireWorld: a seven-segment display and decoder. Conductor cells are dark green to highlight signal flow and display segments.</figcaption>

## Usage

Entities built within Wireworld universes include Langton's Ant[^fourth] (allowing any Langton's Ant pattern to be built within Wireworld) and the Wireworld computer, a Turing-complete computer implemented as a cellular automaton.

# About application

## The purpose of creating

This application was created so that anyone else who loves cellular automata, in particular Wireworld, as much as the author - could conveniently and affordably build their circuits and share with other like-minded people!

## Used technologies

This web application is built using the Javascript library [React.js](https://uk.reactjs.org/), and this page is rendered using the Markdown Preprocessor [Remarkable](https://github.com/jonschlinkert/remarkable). The server is written in [Node.js](https://nodejs.org/uk/) using [Express.js](https://expressjs.com/) and [JWT-tokens](https://jwt .io/).

## Links to GitHub

[Front-End](https://github.com/BaGreal2/wireworld_react)(Client-side part)

[Back-End](https://github.com/BaGreal2/wireworld_server)(Server-side part)

[^first]: A cellular automaton is a discrete model of computation studied in automata theory. A cellular automaton consists of a regular grid of cells, each in one of a finite number of states, such as on and off (in contrast to a coupled map lattice). The grid can be in any finite number of dimensions. For each cell, a set of cells called its neighborhood is defined relative to the specified cell. An initial state (time t = 0) is selected by assigning a state for each cell. A new generation is created (advancing t by 1), according to some fixed rule (generally, a mathematical function) that determines the new state of each cell in terms of the current state of the cell and the states of the cells in its neighborhood. Typically, the rule for updating the state of cells is the same for each cell and does not change over time, and is applied to the whole grid simultaneously, though exceptions are known, such as the stochastic cellular automaton and asynchronous cellular automaton.
[^second]: In computability theory, a system of data-manipulation rules (such as a computer's instruction set, a programming language, or a cellular automaton) is said to be Turing-complete or computationally universal if it can be used to simulate any Turing machine (devised by English mathematician and computer scientist Alan Turing). This means that this system is able to recognize or decide other data-manipulation rule sets. Turing completeness is used as a way to express the power of such a data-manipulation rule set. Virtually all programming languages today are Turing-complete.
[^third]: In cellular automata, the Moore neighborhood is defined on a two-dimensional square lattice and is composed of a central cell and the eight cells that surround it.
[^fourth]: Langton's ant is a two-dimensional universal Turing machine with a very simple set of rules but complex emergent behavior. It was invented by Chris Langton in 1986 and runs on a square lattice of black and white cells.
