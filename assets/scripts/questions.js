const questionsArray = [
    { 
        // question 1
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        option: {
            a: "getElementById()",
            b: "getElementByClassName()",
            c: "Both of the above",
            d: "None of the above",
        },
        answer: "c",
    },
    {
        // question 2
        question: "Javascript is an __________ language?",
        option: {
            a: "Object-Oriented",
            b: "Object-Based",
            c: "Procedural",
            d: "None of the above",
        },
        answer: "a",
    },
    {
        // question 3
        question: "Which of the following keywords is used to define a variable in Javascript?",
        option: {
            a: "var",
            b: "let",
            c: "Both var and let",
            d: "None of the above",
        },
        answer: "c",
    },
    {
        // question 4
        question: "<pre><code><script type='text/javascript'>a = 5 + '9'; <br>document.write(a);</script></code></pre>",
        option: {
            a: "Compilation Error",
            b: "14",
            c: "Runtime Error",
            d: "59",
        },
        answer: "a",
    },
    {
        // question 5
        question: "When the switch statement matches the expression with the given labels, how is the comparison done?",
        option: {
            a: "Both the datatype and the result of the expression are compared",
            b: "Only the datatype of the expression is compared",
            c: "Only the value of the expression is compared",
            d: "None of the above",
        },
        answer: "a",
    },
    {
        // question 6
        question: "Upon encountering empty statements, what does the Javascript interpreter do?",
        option: {
            a: "Throws an error",
            b: "Ignores the statements",
            c: "Gives a warning",
            d: "None of the above",
        },
        answer: "b",
    },    
    {
        // question 7
        question: "When the value of an operator is NULL, the typeof returned by the unary operator will be:",
        option: {
            a: "Boolean",
            b: "Undefined",
            c: "Object",
            d: "Integer",
        },
        answer: "c",
    }, 
    {
        // question 8
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        option: {
            a: "document.write()",
            b: "console.log()",
            c: "window.alert()",
            d: "All of the above",
        },
        answer: "d",
    },     
    {
        // question 9
        question: "What keyword is used to check whether a given property is valid or not?",
        option: {
            a: "in",
            b: "is in",
            c: "exists",
            d: "lies",
        },
        answer: "a",
    },  
    {
        // question 10
        question: "What is the use of the <noscript> tag in Javascript?",
        option: {
            a: "The contents are displayed by non-JS-based browsers.",
            b: "Clears all the cookies and cache.",
            c: "Both of the above",
            d: "None of the above",
        },
        answer: "a",
    },     
    {
        // question 11
        question: "What does the ‘toLocateString()’ method do in JS?",
        option: {
            a: "Returns a localized object representation.",
            b: "Returns a parsed string.",
            c: "Returns a localized string representation of an object.",
            d: "None of the above",
        },
        answer: "c",
    }, 
    {
        // question 12
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        option: {
            a: "stringify()",
            b: "parse()",
            c: "convert()",
            d: "None of the above",
        },
        answer: "a",
    }, 
    {
        // question 13
        question: "Which of the following are closures in Javascript?",
        option: {
            a: "Variables",
            b: "Functions",
            c: "Objects",
            d: "All of the above",
        },
        answer: "d",
    }, 
    {
        // question 14
        question: "How to stop an interval timer in Javascript?",
        option: {
            a: "clearInterval",
            b: "clearTimer",
            c: "intervalOver",
            d: "None of the above",
        },
        answer: "a",
    }, 
    {
        // question 15
        question: "How do we write a comment in javascript?",
        option: {
            a: "/*  */",
            b: "//",
            c: "#",
            d: "$ $",
        },
        answer: "b",
    }, 
    {
        // question 16
        question: "What does the Javascript “debugger” statement do?",
        option: {
            a: "It will debug all the errors in the program at runtime.",
            b: "It acts as a breakpoint in a program.",
            c: "It will debug error in the current statement if any.",
            d: "All of the above.",
        },
        answer: "b",
    }, 
    {
        // question 17
        question: "What is the output of the <code>console.log(NaN === NaN);</code>?",
        option: {
            a: "true",
            b: "false",
            c: "undefined",
            d: "Error",
        },
        answer: "b",
    }, 
    {
        // question 18
        question: "What will be the output of <code>console.log(typeof(NaN));</code>?",
        option: {
            a: "Object",
            b: "Number",
            c: "String",
            d: "None of the above",
        },
        answer: "b",
    }, 
    {
        // question 19
        question: "TEMP 19:What will be the output of <code>console.log(typeof(NaN));</code>?",
        option: {
            a: "Object",
            b: "Number",
            c: "String",
            d: "None of the above",
        },
        answer: "b",
    }, 
    {
        // question 20
        question: "TEMP20: What will be the output of <code>console.log(typeof(NaN));</code>?",
        option: {
            a: "Object",
            b: "Number",
            c: "String",
            d: "None of the above",
        },
        answer: "b",
    },              
];