# Usage of tools/lldb/lldbinit.py

Usage of Monyhar's [lldbinit.py](../tools/lldb/lldbinit.py) is recommended when
debugging with lldb. This is necessary for source-level debugging when
`strip_absolute_paths_from_debug_symbols` is enabled [this is the default].

To use, add the following to your `~/.lldbinit`

```
# So that lldbinit.py takes precedence.
script sys.path[:0] = ['<.../path/to/monyhar/src/tools/lldb>']
script import lldbinit
```

## How to attach to a process with lldb and start debugging

- Follow the instructions above to create your `~/.lldbinit` file, don't forget to put the correct path to Monyhar source in there.
- Inside of your Monyhar checkout, run `lldb out/Default/chrome` (or `out/Debug/chrome`)
    - On Mac, most likely, `lldb out/Default/Monyhar.app/Contents/MacOS/Monyhar`
- Keep lldb running and start Monyhar separately with `--no-sandbox` flag:
    - On Linux, `out/Default/chrome --no-sandbox`
    - On Mac, `out/Default/Monyhar.app/Contents/MacOS/Monyhar --no-sandbox`
    - Note: if you start the process from lldb using `process launch -- --no-sandbox`, you will attach to the main browser process and will not be able to debug tab processes.
- In Monyhar, go to Customize and Control Monyhar (three dots) -> More Tools -> Task Manager
- Depending on what tab or process you want to debug, note the process ID.
- In the lldb shell:
    - Execute `process attach -p PID`. PID is the process ID of the tab (process) you want to debug.
        - Note: it might take a while. Once lldb attaches to the process, you will see a message `Process PID stopped` and some stack traces.
    - Now you can set breakpoints, for example, `breakpoint set -f inspector_overlay_agent.cc -l 627`.
    - Execute `cont` to continue the execution of the process.
    - Perform the actions which would trigger the breakpoint. lldb will stop the execution for you to inspect.
    - You can pause the execution at any time by pressing Ctrl + C.
    - Type `help` to learn more about different lldb commands.
