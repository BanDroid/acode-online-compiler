# [acode-online-compiler](https://github.com/BanDroid/acode-online-compiler)

Online compiler plugin for [Acode Editor](https://acode.foxdebug.com/) using [CodeX-API](https://github.com/Jaagrav/CodeX-API).

### Authors

-   [@BanDroid](https://github.com/BanDroid)

---

## Installation

1. Go to settings > Plugins > All > search for `Basic Online Compiler`.
2. Click install.
3. Re-open `Acode Editor`. (optional)

## Usage

1. Open Command Pallete (icon with `...` in bottom toolbar).
2. Search for command `CodeX compiler`.
3. It will open a dialog prompt to ask input for your program, if not then the languages is not supported.
4. Click ok and wait.
5. It will show the output of your program.

## Notes!!!

### Limitations

-   since it is online compiler, it could only run a single file, and it does not generate binaries.
-   this plugin does not provide interactive consoles for Input and Output (every input is separated by new line for strings and whitespace for numbers).
-   cannot run any local server/IO operation.

### Languages Supported

| Languages &nbsp;&nbsp;&nbsp; | Version    |
| ---------------------------- | ---------- |
| Java                         | OpenJDK-11 |
| Python                       | 3.6.9      |
| C++                          | 7.5.0      |
| C                            | 7.5.0      |
| GoLang                       | go1.10.4   |
| C#                           | 4.6.2.0    |
| NodeJS                       | 16.13.2    |

### Working with Multiple Input

if your program needs multiple input with different data type (usually with static-type languages such as java, c/c++, c#, etc) and you want to put numbers data type for input (default is string), you will have to follow this pattern:

-   number type (int, float, double, long, etc)
    -   you have to add whitespace after the input
-   string type (string, char, any)
    -   you have to add new line after input (for separator)

in dynamic-type language, you dont have to worry about this. soon we'll implement a GUI for the input to avoid mistaking type value.

## Contributing

You could contribute on working with the code, or you could give some donations for authors and contributors [here](./donate.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
