# Linux Proxy Config

Monyhar on Linux has several possible sources of proxy info: GNOME/KDE
settings, command-line flags, and environment variables.

## GNOME and KDE

When Monyhar detects that it is running in GNOME or KDE, it will automatically
use the appropriate standard proxy settings. You can configure these proxy
settings from the options dialog (the "Change proxy settings" button in the
"Under the Hood" tab), which will launch the GNOME or KDE proxy settings
applications, or by launching those applications directly.

## Flags and environment variables

For other desktop environments, Monyhar's proxy settings can be configured
using command-line flags or environment variables. These are documented on the
man page (`man google-chrome` or `man monyhar-browser`).
