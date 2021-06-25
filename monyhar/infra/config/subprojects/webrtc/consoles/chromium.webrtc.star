# Copyright 2020 The Monyhar Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

load("//console-header.star", "HEADER")

luci.console_view(
    name = "monyhar.webrtc",
    header = HEADER,
    repo = "https://monyhar.googlesource.com/monyhar/src",
    entries = [
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Android Builder",
            category = "android",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Android Tester",
            category = "android",
            short_name = "tst",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Linux Builder",
            category = "linux",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Linux Tester",
            category = "linux",
            short_name = "tst",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Mac Builder",
            category = "mac",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Mac Tester",
            category = "mac",
            short_name = "tst",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Win Builder",
            category = "win",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Win10 Tester",
            category = "win",
            short_name = "10",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Win7 Tester",
            category = "win",
            short_name = "7",
        ),
        luci.console_view_entry(
            builder = "webrtc/WebRTC Monyhar Win8 Tester",
            category = "win",
            short_name = "8",
        ),
    ],
)
