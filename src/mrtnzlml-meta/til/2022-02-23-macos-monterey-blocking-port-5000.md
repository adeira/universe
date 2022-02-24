---
title: macOS Monterey is blocking port 5000
tags: ['macos']
---

This happened today. I couldn't start my Rust server because port 5000 was already occupied. But by whom? 🤔 I did some digging, and I got something like this:

```text
$ lsof -i :5000
COMMAND    PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ControlCe 1677 user   32u  IPv4 0x728ff8e52d51c6dd      0t0  TCP *:commplex-main (LISTEN)
ControlCe 1677 user   33u  IPv6 0x728ff8e51d98ec65      0t0  TCP *:commplex-main (LISTEN)
```

Hmm? I tried to kill the process but that didn't help. It took me a while to research that the culprit is macOS Monterey (I didn't start the server ever since I upgraded to this macOS version): https://stackoverflow.com/q/69868760/3135248

Solution: Go to System Preference --> Sharing --> uncheck off the "AirPlay Receiver"

WTF
