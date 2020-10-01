---
title: "I Finally Understand Closures! (2008)"
date: "2019-09-03"
---

This is a re-post from 2008 when I had an "aha" moment and finally groked
closures!

<!-- end -->

<i>Originally posted 15th July 2008 [here](https://www.reddit.com/r/programming/comments/6rx18/i_finally_understand_closures/)</i>.

I have been trying to understand closures off-and-on for what seems like forever now. Last night however, while hacking around in the Clojure REPL I finally groked it!

To really understand closures you need to come up with a scenario where you would use one (and this is easier to do in languages like Clojure where functions - rather than classes - are used everywhere). The scenario is this: We are writing a simple extension for a text editor (imagine Emacs with Clojure as its extension language - wow, what a great idea!). We want to add a function that allows users to highlight a range of text and copy it to the clipboard (strangely, our amazing text editor doesn’t do this for us!). When the user presses ALT+b the location of the cursor is remembered and then the user can continue to edit as normal and navigate around the text. When ALT+e is pressed, the text from the start position to the current position is copied from the text buffer and passed into the clipboard.

Note all code in this entry is inconsistent pseudo code except where a language preference is explicitly stated - I introduce and change the syntax of the pseudo code as I go to suite the particular example.

Our imaginary text editor includes library functions that allow us to associate functions with key presses like this:

```elisp
key_bind('ALT+b' highlight_text_function)
```

Think for a minute…. How would you implement `highlight_text_function`?

The immediate problem is the need to maintain state somewhere. When ALT+b is pressed we need to remember the cursor position, then when ALT+e is pressed we do all the work. So we need more than one function, right? And we need to place the state somewhere.

So what are our options? Well, we can use a global variable:

```
int start_position_global;

key_bind('ALT+b' begin_highlight_text_function)
key_bind('ALT+e' end_highlight_text_function)
```

then `begin_highlight_text_function` would just set the global variable and `end_highlight_text_function` would use it and do the rest of the work.

Alternatively, using an object-oriented approach we could create a class:

```java
class HighLightText {

    private int start_position_global;

    public begin_highlight_text_function();
    public end_highlight_text_function();

    public init () {
    	key_bind('ALT+b' begin_highlight_text_function);
    	key_bind('ALT+e' end_highlight_text_function);
    }
}
```

This is very similar to the first example especially for languages such as Python where global variables are not really global - they are scoped at the module level.

There is another option of course - use a closure!

Before explaining what closures are I want us to back track a little. At the start we had this:

```
key_bind('ALT+b' highlight_text_function)
```

Simple. A key-press is associated with a function. Very quickly we ended up with two independent functions not because it’s logical to have two functions but because we needed to come up with a way of handling state. Logically, there should be a single function, right? Put another way - the functionality of the operation to be performed is a single function. Let’s describe what the function should do:

1. First we get the current cursor position and name it `begin_pos`
1. Then we want to bind the ALT+e key to another function called `end_highlight_text_function`
1. When ALT+e is pressed we need to:
   - Get the current cursor position and name it `end_pos`
   - Extract the text between `start_pos` and `end_pos` and name it `highlighted_text`
   - Send the highlighted text to the clipboard using some built-in function

Let’s now write the steps described above in Python:

```python
def highlight_text_function():
    start_pos = get_cursor_pos()

    def end_highlight_text_function():
        highlight_text = get_text_region(start_pos, get_cursor_pos())
        add_to_clipboard(highlight_text)

    key_bind('ALT+e', end_highlight_text_function)
```

Can you see what is happening here? We still have two functions but one is defined within the other as a nested function. But there’s more to it than that! Without support for closures in the language this function would not work. Can you see why?

To explain what the function does, `start_pos` is created when we `call highlight_text_function`. When `end_highlight_text_function` is called `start_pos` is used because `end_highlight_text_function` is a closure. When `end_highlight_text_function` is created, it uses `start_pos` from the enclosing scope so Python wraps the function into an object called a closure which contains the state of `start_pos`.

So a closure is a neat way of adding state to a function without caring about “classes or objects” - you can think in terms of functions without getting bogged down in the details.

Finally, here is a Clojure version that does the same thing as the Python version but it uses an anonymous function for the closure:

```clojure
(defn hightlight-text-function []
(let [start-pos (get-cursor-pos)](key-bind
    "ALT+e"
    (fn [] (add-to-clipboard((get-text-region start-pos (get-cursor-pos))))))))
```

By the way, Clojure is an excellent language and I recommend you check it out. It is functional, has persistent data structures, Python-style literal collection syntax, support for concurrency, and hosted on the JVM - the list goes on!
